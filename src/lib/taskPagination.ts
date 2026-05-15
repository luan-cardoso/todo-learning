import { getTasks, TASKS_PAGE_SIZE } from "./tasks";

export interface TaskListItem {
  _id: string;
  title: string;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
}

type ApiRecord = Record<string, unknown>;

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return undefined;
}

function readList(value: unknown): TaskListItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value as TaskListItem[];
}

export function extractTasks(res: ApiRecord): TaskListItem[] {
  const fromData = readList(res.data);
  if (fromData) return fromData;

  const data = res.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const nested = data as ApiRecord;
    for (const key of ["tasks", "items", "results", "data"]) {
      const list = readList(nested[key]);
      if (list) return list;
    }
  }

  for (const key of ["tasks", "items", "results"]) {
    const list = readList(res[key]);
    if (list) return list;
  }

  return [];
}

function collectMetaSources(res: ApiRecord): ApiRecord[] {
  const sources: ApiRecord[] = [res];

  for (const key of ["pagination", "meta"]) {
    const value = res[key];
    if (value && typeof value === "object") sources.push(value as ApiRecord);
  }

  const data = res.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const nested = data as ApiRecord;
    sources.push(nested);
    for (const key of ["pagination", "meta"]) {
      const value = nested[key];
      if (value && typeof value === "object") sources.push(value as ApiRecord);
    }
  }

  return sources;
}

function readMetaNumber(sources: ApiRecord[], keys: string[]): number | undefined {
  for (const source of sources) {
    for (const key of keys) {
      const value = asNumber(source[key]);
      if (value !== undefined) return value;
    }
  }
  return undefined;
}

export function resolveTaskPagination(
  res: ApiRecord,
  page: number,
  dataLength: number,
) {
  const sources = collectMetaSources(res);

  const totalPages = readMetaNumber(sources, [
    "totalPages",
    "total_pages",
    "pages",
    "pageCount",
    "page_count",
  ]);

  const total = readMetaNumber(sources, [
    "total",
    "totalItems",
    "total_items",
    "count",
  ]);

  let resolvedPages = totalPages;
  if (resolvedPages === undefined && total !== undefined) {
    resolvedPages = Math.ceil(total / TASKS_PAGE_SIZE);
  }
  if (resolvedPages === undefined) {
    resolvedPages = dataLength < TASKS_PAGE_SIZE ? page : page + 1;
  }

  if (dataLength >= TASKS_PAGE_SIZE) {
    resolvedPages = Math.max(resolvedPages, page + 1);
  } else {
    resolvedPages = Math.max(resolvedPages, page);
  }

  const hasNextFromApi = sources.some(
    (source) => source.hasNext === true || source.hasMore === true,
  );

  const hasNextPage =
    hasNextFromApi || page < resolvedPages || dataLength >= TASKS_PAGE_SIZE;

  return {
    totalPages: Math.max(1, resolvedPages),
    hasNextPage,
  };
}

export function extractPendingTotal(res: ApiRecord): number | undefined {
  const sources = collectMetaSources(res);
  return readMetaNumber(sources, [
    "pendingTotal",
    "pending",
    "totalPending",
    "pendingCount",
    "incomplete",
    "incompleteTotal",
  ]);
}

export async function countPendingTasks(): Promise<number> {
  const probe = (await getTasks(1, 1, {
    completed: false,
  })) as ApiRecord;

  const fromMeta = extractPendingTotal(probe);
  if (fromMeta !== undefined) return fromMeta;

  const total = readMetaNumber(collectMetaSources(probe), [
    "total",
    "totalItems",
    "total_items",
    "count",
  ]);
  if (total !== undefined) return total;

  let count = 0;
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = (await getTasks(page, TASKS_PAGE_SIZE, {
      completed: false,
    })) as ApiRecord;
    const items = extractTasks(res);
    count += items.filter((task) => !task.completed).length;
    const { hasNextPage } = resolveTaskPagination(res, page, items.length);
    hasMore = hasNextPage;
    page += 1;
  }

  return count;
}

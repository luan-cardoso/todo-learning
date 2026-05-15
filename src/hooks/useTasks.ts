import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { getAuthToken, subscribeAuth } from "../lib/authSession";
import {
  getTasks,
  updateTask,
  deleteTask,
  TASKS_PAGE_SIZE,
} from "../lib/tasks";
import {
  extractTasks,
  resolveTaskPagination,
  countPendingTasks,
  type TaskListItem,
} from "../lib/taskPagination";

export function useTasks() {
  const token = useSyncExternalStore(
    subscribeAuth,
    getAuthToken,
    () => null,
  );
  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [loading, setLoading] = useState(true);

  const reset = useCallback(() => {
    setTasks([]);
    setPage(1);
    setTotalPages(1);
    setHasNextPage(false);
    setPendingTasks(0);
    setLoading(false);
  }, []);

  const refreshPendingCount = useCallback(async () => {
    const total = await countPendingTasks();
    setPendingTasks(total);
  }, []);

  const fetchPage = useCallback(
    async (targetPage: number) => {
      setLoading(true);
      try {
        const res = (await getTasks(
          targetPage,
          TASKS_PAGE_SIZE,
        )) as Record<string, unknown>;
        const data = extractTasks(res);
        const { totalPages: pages, hasNextPage: next } = resolveTaskPagination(
          res,
          targetPage,
          data.length,
        );
        setTasks(data);
        setPage(targetPage);
        setTotalPages(pages);
        setHasNextPage(next);
      } catch {
        setTasks([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!token) {
      reset();
      return;
    }
    fetchPage(1);
    refreshPendingCount();
  }, [token, fetchPage, refreshPendingCount, reset]);

  async function handleToggle(id: string, completed: boolean) {
    await updateTask(id, { completed: !completed });
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: !completed } : t)),
    );
    setPendingTasks((prev) => (completed ? prev + 1 : Math.max(0, prev - 1)));
  }

  async function handleDelete(id: string) {
    const task = tasks.find((t) => t._id === id);
    await deleteTask(id);
    if (task && !task.completed) {
      setPendingTasks((prev) => Math.max(0, prev - 1));
    }
    const isLastOnPage = tasks.length === 1 && page > 1;
    await fetchPage(isLastOnPage ? page - 1 : page);
    await refreshPendingCount();
  }

  function refetch() {
    fetchPage(1);
    refreshPendingCount();
  }

  function goToPrevPage() {
    if (page > 1) fetchPage(page - 1);
  }

  function goToNextPage() {
    if (hasNextPage) fetchPage(page + 1);
  }

  return {
    tasks,
    page,
    totalPages,
    hasNextPage,
    pendingTasks,
    loading,
    handleToggle,
    handleDelete,
    refetch,
    goToPrevPage,
    goToNextPage,
  };
}

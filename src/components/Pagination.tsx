import type { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage?: boolean;
  loading?: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  hasNextPage,
  loading = false,
  onPrev,
  onNext,
}) => {
  const hasPrev = page > 1;
  const hasNext = hasNextPage ?? page < totalPages;

  return (
    <nav
      aria-label="Paginação de tarefas"
      className="max-w-6xl w-full flex items-center justify-center gap-4 py-6"
    >
      <button
        type="button"
        onClick={onPrev}
        disabled={!hasPrev || loading}
        className="flex items-center gap-2 text-xs font-semibold tracking-wide px-4 py-2 rounded-xl bg-white/5 ring-1 ring-white/10 hover:ring-amber-500/50 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:ring-white/10 cursor-pointer"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
        Anterior
      </button>
      <span className="text-sm font-semibold tracking-widest text-neutral-400">
        Página {page}
        {totalPages > 1 ? ` de ${totalPages}` : ""}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext || loading}
        className="flex items-center gap-2 text-xs font-semibold tracking-wide px-4 py-2 rounded-xl bg-white/5 ring-1 ring-white/10 hover:ring-amber-500/50 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:ring-white/10 cursor-pointer"
      >
        Próxima
        <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
      </button>
    </nav>
  );
};

export default Pagination;

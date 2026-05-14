import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  buttonLabel: string;
  loadingLabel?: string;
  loading?: boolean;
  icon?: IconDefinition;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  buttonLabel,
  loadingLabel,
  loading = false,
  icon,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled ?? loading}
      className="bg-amber-500 text-[#1d233d] text-sm font-medium px-4 py-2 tracking-wide rounded-xl flex items-center gap-2 w-fit cursor-pointer hover:scale-105 duration-300 shadow-2xl"
    >
      <span className="tracking-wider">
        {loading && loadingLabel ? loadingLabel : buttonLabel}
      </span>
      {!loading && icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
}

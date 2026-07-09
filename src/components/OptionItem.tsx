import type { JSX } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { cn } from "../utils/utils";

type OptionItemProps = {
  label: string;
  icon: JSX.Element;
  isSelected?: boolean;
  isFocused?: boolean;
  onClick?: () => void;
  id: string;
};
function OptionItem({ label, icon, isSelected, isFocused, onClick, id }: OptionItemProps) {
  return (
    <li
      role='option'
      id={id}
      aria-selected={isSelected}
      className={cn(
        "flex cursor-pointer gap-3 rounded-sm p-2 hover:bg-gray-50",
        isSelected && "items-center justify-between bg-gray-50",
        isFocused && "bg-gray-100"
      )}
      onClick={onClick}
    >
      {icon}
      <span className='w-full'>{label}</span>
      {isSelected && (
        <RiCheckboxCircleFill
          className='size-5'
          aria-hidden='true'
        />
      )}
    </li>
  );
}

export { OptionItem };
export type { OptionItemProps };

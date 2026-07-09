import { useState, useRef, useEffect } from "react";

import { RiGlobeLine } from "react-icons/ri";
import { RiMistFill } from "react-icons/ri";
import { RiLock2Line } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";

import { OptionItem, type OptionItemProps } from "./components/OptionItem";
import { cn } from "./utils/utils";

type Options = Pick<OptionItemProps, "label" | "icon">;

const options: Options[] = [
  {
    label: "Public",
    icon: <RiGlobeLine className='size-5' />
  },
  {
    label: "Unlisted",
    icon: <RiMistFill className='size-5' />
  },
  {
    label: "Private",
    icon: <RiLock2Line className='size-5' />
  }
];

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [focusedIndex, setFocusedIndex] = useState(2);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const listboxId = "privacy-listbox";
  const buttonId = "privacy-button";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(selectedIndex);
    }
  };

  const handleOptionSelect = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(selectedIndex);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        handleOptionSelect(focusedIndex);
        break;
      case "Escape":
      case "Tab":
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

  return (
    <main className='mx-auto flex min-h-screen w-full min-w-dvw flex-col items-center'>
      <div className='flex w-full max-w-68 flex-col gap-1 py-50 text-sm font-medium text-neutral-900'>
        <button
          ref={buttonRef}
          id={buttonId}
          role='combobox'
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={isOpen ? `option-${focusedIndex}` : undefined}
          aria-label='Privacy options'
          className='flex cursor-pointer items-center justify-between rounded-sm border border-neutral-200 px-3 py-2 text-left shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] hover:bg-neutral-50 hover:text-neutral-950 focus:bg-neutral-50 focus:text-neutral-950 focus:shadow-[0_0px_0px_1px_rgba(68,76,231,1),0_0px_0px_4px_rgba(68,76,231,0.12)] focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 disabled:shadow-none'
          onClick={toggleDropDown}
          onKeyDown={handleKeyDown}
        >
          <span>Privacy option</span>

          <RiArrowDownSLine
            className={cn(
              "size-5 transition-transform duration-200 disabled:bg-neutral-100 disabled:shadow-none",
              isOpen && "rotate-180"
            )}
            aria-hidden='true'
          />
        </button>

        {isOpen && (
          <ul
            ref={dropdownRef}
            id={listboxId}
            role='listbox'
            aria-labelledby={buttonId}
            tabIndex={-1}
            className='flex flex-col gap-2 rounded-lg p-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]'
          >
            {options.map((option, index) => (
              <OptionItem
                key={option.label}
                id={`option-${index}`}
                label={option.label}
                icon={option.icon}
                isSelected={selectedIndex === index}
                isFocused={focusedIndex === index}
                onClick={() => handleOptionSelect(index)}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export { App };

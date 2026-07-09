# Dropdown Menu

A responsive, accessible dropdown menu built as part of the [GreatFrontEnd Projects](https://www.greatfrontend.com/projects/challenges/dropdown-menu-component) challenge series.

## Live Site

[Dropdown Menu](https://dropdown-menu-mauve.vercel.app/)

## Challenge

This project is part of a GreatFrontEnd challenge focused on building a single dropdown/combobox component from scratch.

## Features

- **Keyboard navigation** — Arrow keys move focus between options, `Home`/`End` jump to the first/last option, `Enter`/`Space` select, `Escape`/`Tab` close the dropdown and return focus to the trigger button.
- **Click-outside to close** — A `mousedown` listener checks the event target against both the trigger and dropdown refs, closing the list when the click lands outside either.
- **Selected state persists across opens** — Reopening the dropdown resets keyboard focus to the currently selected option rather than the first one.
- **Rotating chevron indicator** — The dropdown icon rotates 180° when open, driven by a single conditional class.
- **ARIA combobox pattern** — Trigger button uses `role="combobox"` with `aria-expanded`, `aria-controls`, and `aria-activedescendant`; the list uses `role="listbox"` with `aria-labelledby` pointing back to the trigger.

## Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Vite** — No SSR or complex routing needed here — Vite is the straightforward choice.
- **react-icons** — Globe, mist, lock, chevron, and checkmark icons for the trigger and options.
- **clsx** + **tailwind-merge** — Conditional class merging without specificity conflicts.

## Code Conventions

- **Named exports** via `export { }` at the bottom of each file.
- **`type`** over `interface` for all type definitions.
- **No `I` or `T` prefixes** on type names.
- **kebab-case** for everything non-React.
- **camelCase** for hooks.
- **PascalCase** for component files.

## Project Structure

```
src/
├── components/
│   └── OptionItem.tsx   # Single dropdown option: icon, label, selected/focused states
├── utils/
│   └── utils.ts          # cn() — clsx + tailwind-merge helper
├── App.tsx                # Dropdown state, keyboard handling, click-outside logic, options data
└── main.tsx                # React root render entry point
```

## Getting Started

```bash
pnpm install  # install dependencies
pnpm dev      # start development server
pnpm lint     # run linters
pnpm format   # run code formatter
pnpm build    # build for production
```

import type { SVGProps } from "react";
export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name:
    | "grid"
    | "users"
    | "briefcase"
    | "clipboard"
    | "settings"
    | "menu"
    | "x"
    | "plus";
}) {
  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
      </>
    ),
    clipboard: (
      <>
        <rect x="4" y="4" width="16" height="18" rx="2" />
        <path d="M9 4V2h6v2M8 10h8M8 14h8M8 18h5" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM12 2v3M12 19v3M2 12h3M19 12h3" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    x: <path d="m6 6 12 12M18 6 6 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

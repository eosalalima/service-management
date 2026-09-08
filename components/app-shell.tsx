"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Icon } from "@/components/icons";
const items = [
  ["/dashboard", "Dashboard", "grid"],
  ["/customers", "Customers", "users"],
  ["/services", "Services", "briefcase"],
  ["/work-orders", "Work Orders", "clipboard"],
  ["/settings", "Settings", "settings"],
] as const;
function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Main navigation"
      className="mt-8 flex flex-1 flex-col gap-1"
    >
      {items.map(([href, label, icon]) => {
        const active =
          pathname === href ||
          (href === "/work-orders" && pathname.startsWith("/work-orders/"));
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-white/12 text-white" : "text-slate-300 hover:bg-white/7 hover:text-white"}`}
          >
            <Icon name={icon} className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 font-black text-slate-950">
        S
      </span>
      <div>
        <div className="font-bold text-white">Service Desk</div>
        <div className="text-xs text-slate-400">Operations workspace</div>
      </div>
    </div>
  );
}
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const title =
    items.find(
      ([href]) =>
        pathname === href ||
        (href === "/work-orders" && pathname.startsWith("/work-orders/")),
    )?.[1] ?? "Service Management";
  return (
    <div className="h-screen overflow-hidden lg:grid lg:grid-cols-[260px_1fr]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <aside className="hidden bg-[#13271f] p-5 lg:flex lg:flex-col">
        <Brand />
        <Navigation />
        <p className="text-xs text-slate-500">Starter workspace · v0.1</p>
      </aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-slate-950/55"
            onClick={() => setOpen(false)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="relative flex h-full w-[min(82vw,300px)] flex-col bg-[#13271f] p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <Brand />
              <button
                autoFocus
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-white"
              >
                <Icon name="x" className="h-6 w-6" />
              </button>
            </div>
            <Navigation onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
      <div className="flex min-h-0 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-7">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="rounded-lg border border-slate-200 p-2 lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
            <span className="font-bold">
              {pathname === "/work-orders/new" ? "New Work Order" : title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-semibold">Alex Morgan</div>
              <div className="text-xs text-slate-500">Operations manager</div>
            </div>
            <div
              aria-label="User profile placeholder"
              className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800"
            >
              AM
            </div>
          </div>
        </header>
        <main
          id="main-content"
          tabIndex={-1}
          className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-7 lg:p-9"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

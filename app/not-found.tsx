import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="text-center">
        <p className="eyebrow">404 error</p>
        <h1 className="page-title">Page not found</h1>
        <p className="muted mt-3">The page you requested does not exist.</p>
        <Link className="button mt-6" href="/dashboard">
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}

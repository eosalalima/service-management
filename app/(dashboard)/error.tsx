"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="card mx-auto mt-16 max-w-lg p-8 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="page-title">We couldn’t load this page</h1>
      <p className="muted mt-3">
        Check the database connection, then try again.
      </p>
      <button className="button mt-6" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

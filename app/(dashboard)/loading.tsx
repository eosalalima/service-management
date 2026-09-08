export default function Loading() {
  return (
    <div role="status" aria-label="Loading page" className="animate-pulse">
      <div className="h-3 w-24 rounded bg-slate-200" />
      <div className="mt-3 h-9 w-64 rounded bg-slate-200" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div className="card h-32 bg-slate-100" key={i} />
        ))}
      </div>
      <div className="card mt-7 h-80 bg-slate-100" />
    </div>
  );
}

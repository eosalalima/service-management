const styles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  SCHEDULED: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-violet-100 text-violet-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-slate-200 text-slate-700",
};
export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${styles[status] ?? styles.PENDING}`}
    >
      <span className="sr-only">Status: </span>
      {status.replaceAll("_", " ")}
    </span>
  );
}

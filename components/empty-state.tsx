export function EmptyState({ noun }: { noun: string }) {
  return (
    <div className="px-6 py-14 text-center">
      <div className="text-base font-bold">No {noun} yet</div>
      <p className="muted mt-1 text-sm">
        Seed the database to see starter records here.
      </p>
    </div>
  );
}

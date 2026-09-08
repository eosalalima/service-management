import type { Metadata } from "next";
import { getDashboardData } from "@/lib/data";
import { PageHeading } from "@/components/page-heading";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
export const metadata: Metadata = { title: "Dashboard" };
const date = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
export default async function DashboardPage() {
  const { metrics, recent } = await getDashboardData();
  const cards = [
    ["Customers", metrics.customers, "Active accounts"],
    ["Services", metrics.services, "Available offerings"],
    ["Open work orders", metrics.open, "Needs attention"],
    ["Completed", metrics.completed, "All time"],
  ] as const;
  return (
    <>
      <PageHeading
        eyebrow="Overview"
        title="Good morning, Alex"
        description="Here’s what is happening across your service operation."
      />
      <section
        aria-label="Business metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {cards.map(([label, value, note]) => (
          <article className="card p-5" key={label}>
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
            <p className="mt-2 text-xs text-slate-500">{note}</p>
          </article>
        ))}
      </section>
      <section className="card mt-7">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="font-bold">Recent work orders</h2>
            <p className="muted text-sm">Five most recently updated</p>
          </div>
        </div>
        {recent.length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Work order</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((order) => (
                  <tr key={order.id}>
                    <td className="font-semibold">{order.title}</td>
                    <td>{order.customer.name}</td>
                    <td>{order.service.name}</td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="text-slate-500">
                      {date.format(order.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState noun="work orders" />
        )}
      </section>
    </>
  );
}

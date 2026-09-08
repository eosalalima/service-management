import type { Metadata } from "next";
import Link from "next/link";
import { getWorkOrders } from "@/lib/data";
import { PageHeading } from "@/components/page-heading";
import { EmptyState } from "@/components/empty-state";
import { StatusBadge } from "@/components/status-badge";
import { Icon } from "@/components/icons";
export const metadata: Metadata = { title: "Work Orders" };
const date = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
export default async function WorkOrdersPage() {
  const orders = await getWorkOrders();
  return (
    <>
      <PageHeading
        eyebrow="Operations"
        title="Work orders"
        description="Track upcoming, active, and completed customer work."
        action={
          <Link href="/work-orders/new" className="button gap-2">
            <Icon name="plus" className="h-4 w-4" />
            New work order
          </Link>
        }
      />
      <section className="card">
        {orders.length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Scheduled</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="font-semibold">{o.title}</td>
                    <td>{o.customer.name}</td>
                    <td>{o.service.name}</td>
                    <td>
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="text-slate-600">
                      {o.scheduledFor
                        ? date.format(o.scheduledFor)
                        : "Not scheduled"}
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

import type { Metadata } from "next";
import { getCustomers } from "@/lib/data";
import { PageHeading } from "@/components/page-heading";
import { EmptyState } from "@/components/empty-state";
export const metadata: Metadata = { title: "Customers" };
export default async function CustomersPage() {
  const customers = await getCustomers();
  return (
    <>
      <PageHeading
        eyebrow="Directory"
        title="Customers"
        description="Customer contacts and their service history in one place."
      />
      <section className="card">
        {customers.length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Work orders</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td className="font-semibold">{c.name}</td>
                    <td>
                      <a
                        className="text-emerald-800 underline-offset-2 hover:underline"
                        href={`mailto:${c.email}`}
                      >
                        {c.email}
                      </a>
                    </td>
                    <td className="text-slate-600">{c.phone ?? "—"}</td>
                    <td>{c._count.workOrders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState noun="customers" />
        )}
      </section>
    </>
  );
}

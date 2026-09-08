import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import { PageHeading } from "@/components/page-heading";
import { EmptyState } from "@/components/empty-state";
export const metadata: Metadata = { title: "Services" };
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeading
        eyebrow="Catalog"
        title="Services"
        description="Manage the work your team offers and its standard pricing."
      />
      <section className="card">
        {services.length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Work orders</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id}>
                    <td className="font-semibold">{s.name}</td>
                    <td className="max-w-md text-slate-600">
                      {s.description ?? "—"}
                    </td>
                    <td>{currency.format(Number(s.price))}</td>
                    <td>{s._count.workOrders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState noun="services" />
        )}
      </section>
    </>
  );
}

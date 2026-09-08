import type { Metadata } from "next";
import { getFormOptions } from "@/lib/data";
import { PageHeading } from "@/components/page-heading";
import { WorkOrderForm } from "./work-order-form";
export const metadata: Metadata = { title: "New Work Order" };
export default async function NewWorkOrderPage() {
  const options = await getFormOptions();
  return (
    <>
      <PageHeading
        eyebrow="Work orders"
        title="Create work order"
        description="Assign work to a customer, choose a service, and optionally schedule it."
      />
      <WorkOrderForm {...options} />
    </>
  );
}

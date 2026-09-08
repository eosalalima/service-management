import { z } from "zod";

export const workOrderSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Enter a title of at least 3 characters.")
    .max(100),
  description: z.string().trim().max(1000).optional(),
  customerId: z.string().trim().min(1, "Choose a customer."),
  serviceId: z.string().trim().min(1, "Choose a service."),
  scheduledFor: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || !Number.isNaN(Date.parse(value)),
      "Enter a valid date and time.",
    ),
});

export type WorkOrderInput = z.infer<typeof workOrderSchema>;
export type WorkOrderFormState = {
  errors?: Partial<Record<keyof WorkOrderInput, string[]>>;
  message?: string;
};

export function parseWorkOrderForm(formData: FormData) {
  return workOrderSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    customerId: formData.get("customerId"),
    serviceId: formData.get("serviceId"),
    scheduledFor: formData.get("scheduledFor"),
  });
}

export function buildWorkOrderCreateData(input: WorkOrderInput) {
  return {
    title: input.title,
    description: input.description || null,
    customerId: input.customerId,
    serviceId: input.serviceId,
    scheduledFor: input.scheduledFor ? new Date(input.scheduledFor) : null,
    status: input.scheduledFor ? ("SCHEDULED" as const) : ("PENDING" as const),
  };
}

export type MetricSource = {
  customerCount: number;
  serviceCount: number;
  statuses: readonly string[];
};
export function calculateDashboardMetrics(source: MetricSource) {
  return {
    customers: source.customerCount,
    services: source.serviceCount,
    open: source.statuses.filter(
      (status) => !["COMPLETED", "CANCELLED"].includes(status),
    ).length,
    completed: source.statuses.filter((status) => status === "COMPLETED")
      .length,
  };
}

"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  buildWorkOrderCreateData,
  parseWorkOrderForm,
  type WorkOrderFormState,
} from "@/lib/work-orders";
export async function createWorkOrder(
  _state: WorkOrderFormState,
  formData: FormData,
): Promise<WorkOrderFormState> {
  const parsed = parseWorkOrderForm(formData);
  if (!parsed.success)
    return {
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  await prisma.workOrder.create({
    data: buildWorkOrderCreateData(parsed.data),
  });
  revalidatePath("/work-orders");
  revalidatePath("/dashboard");
  redirect("/work-orders");
}

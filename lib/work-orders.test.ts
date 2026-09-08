import { describe, expect, it } from "vitest";
import {
  buildWorkOrderCreateData,
  calculateDashboardMetrics,
  parseWorkOrderForm,
} from "./work-orders";

function validForm() {
  const form = new FormData();
  form.set("title", "Repair front entrance");
  form.set("description", "Door closer needs adjustment");
  form.set("customerId", "cust_1");
  form.set("serviceId", "svc_1");
  form.set("scheduledFor", "2026-10-01T09:30");
  return form;
}

describe("work-order validation", () => {
  it("accepts a complete valid submission", () =>
    expect(parseWorkOrderForm(validForm()).success).toBe(true));
  it("returns field errors for required values", () => {
    const result = parseWorkOrderForm(new FormData());
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors).toMatchObject({
        title: expect.any(Array),
        customerId: expect.any(Array),
        serviceId: expect.any(Array),
      });
  });
});

it("calculates open and completed dashboard metrics", () => {
  expect(
    calculateDashboardMetrics({
      customerCount: 4,
      serviceCount: 3,
      statuses: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
    }),
  ).toEqual({ customers: 4, services: 3, open: 2, completed: 1 });
});

it("builds scheduled create data deliberately", () => {
  const result = parseWorkOrderForm(validForm());
  if (!result.success) throw new Error("fixture should validate");
  const data = buildWorkOrderCreateData(result.data);
  expect(data.status).toBe("SCHEDULED");
  expect(data.scheduledFor).toBeInstanceOf(Date);
  expect(data.description).toBe("Door closer needs adjustment");
});

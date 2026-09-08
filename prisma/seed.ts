import { PrismaClient, WorkOrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

const customers = [
  ["cust_acme", "Acme Property Group", "ops@acme.example", "+1 555 0101"],
  ["cust_harbor", "Harbor Dental", "hello@harbordental.example", "+1 555 0102"],
  ["cust_maple", "Maple Street Bakery", "team@maplebakery.example", null],
  [
    "cust_north",
    "Northwind Logistics",
    "facilities@northwind.example",
    "+1 555 0104",
  ],
  ["cust_summit", "Summit Fitness", "manager@summit.example", "+1 555 0105"],
] as const;

const services = [
  [
    "svc_hvac",
    "HVAC maintenance",
    "Seasonal inspection and filter replacement",
    "189.00",
  ],
  [
    "svc_electrical",
    "Electrical inspection",
    "Safety and load inspection",
    "145.00",
  ],
  [
    "svc_plumbing",
    "Plumbing repair",
    "Standard diagnostic and first hour",
    "125.00",
  ],
  [
    "svc_cleaning",
    "Commercial cleaning",
    "Scheduled workplace cleaning",
    "220.00",
  ],
  [
    "svc_security",
    "Security system service",
    "Alarm and sensor diagnostics",
    "175.00",
  ],
] as const;

const orders = [
  [
    "wo_001",
    "Quarterly HVAC inspection",
    WorkOrderStatus.SCHEDULED,
    "cust_acme",
    "svc_hvac",
    "2026-09-12T14:00:00.000Z",
  ],
  [
    "wo_002",
    "Repair kitchen sink leak",
    WorkOrderStatus.IN_PROGRESS,
    "cust_maple",
    "svc_plumbing",
    null,
  ],
  [
    "wo_003",
    "Panel safety inspection",
    WorkOrderStatus.PENDING,
    "cust_harbor",
    "svc_electrical",
    null,
  ],
  [
    "wo_004",
    "Evening deep clean",
    WorkOrderStatus.COMPLETED,
    "cust_summit",
    "svc_cleaning",
    "2026-09-03T22:00:00.000Z",
  ],
  [
    "wo_005",
    "Loading bay sensor fault",
    WorkOrderStatus.IN_PROGRESS,
    "cust_north",
    "svc_security",
    null,
  ],
  [
    "wo_006",
    "Replace air filters",
    WorkOrderStatus.COMPLETED,
    "cust_harbor",
    "svc_hvac",
    "2026-08-29T13:00:00.000Z",
  ],
  [
    "wo_007",
    "Restroom fixture inspection",
    WorkOrderStatus.CANCELLED,
    "cust_acme",
    "svc_plumbing",
    null,
  ],
  [
    "wo_008",
    "Monthly office cleaning",
    WorkOrderStatus.SCHEDULED,
    "cust_north",
    "svc_cleaning",
    "2026-09-15T20:00:00.000Z",
  ],
] as const;

async function main() {
  for (const [id, name, email, phone] of customers) {
    await prisma.customer.upsert({
      where: { id },
      update: { name, email, phone },
      create: { id, name, email, phone },
    });
  }
  for (const [id, name, description, price] of services) {
    await prisma.service.upsert({
      where: { id },
      update: { name, description, price },
      create: { id, name, description, price },
    });
  }
  for (const [
    id,
    title,
    status,
    customerId,
    serviceId,
    scheduledFor,
  ] of orders) {
    const data = {
      title,
      status,
      customerId,
      serviceId,
      scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
    };
    await prisma.workOrder.upsert({
      where: { id },
      update: data,
      create: { id, ...data },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

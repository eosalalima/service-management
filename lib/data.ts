import "server-only";
import { prisma } from "@/lib/prisma";

const workOrderInclude = {
  customer: { select: { name: true } },
  service: { select: { name: true } },
} as const;

export async function getDashboardData() {
  const [customerCount, serviceCount, groupedOrders, recent] =
    await prisma.$transaction([
      prisma.customer.count(),
      prisma.service.count(),
      prisma.workOrder.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.workOrder.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
        include: workOrderInclude,
      }),
    ]);
  const count = (statuses: string[]) =>
    groupedOrders
      .filter((row) => statuses.includes(row.status))
      .reduce((sum, row) => sum + row._count._all, 0);
  return {
    metrics: {
      customers: customerCount,
      services: serviceCount,
      open: count(["PENDING", "SCHEDULED", "IN_PROGRESS"]),
      completed: count(["COMPLETED"]),
    },
    recent,
  };
}

export const getCustomers = () =>
  prisma.customer.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { workOrders: true } } },
  });
export const getServices = () =>
  prisma.service.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { workOrders: true } } },
  });
export const getWorkOrders = () =>
  prisma.workOrder.findMany({
    orderBy: { updatedAt: "desc" },
    include: workOrderInclude,
  });
export async function getFormOptions() {
  const [customers, services] = await Promise.all([
    prisma.customer.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.service.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, price: true },
    }),
  ]);
  return {
    customers,
    services: services.map((service) => ({
      ...service,
      price: service.price.toFixed(2),
    })),
  };
}

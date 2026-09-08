"use client";
import { useActionState } from "react";
import { createWorkOrder } from "./actions";
type Option = { id: string; name: string };
export function WorkOrderForm({
  customers,
  services,
}: {
  customers: Option[];
  services: (Option & { price: string })[];
}) {
  const [state, action, pending] = useActionState(createWorkOrder, {});
  return (
    <form action={action} className="card max-w-3xl p-5 sm:p-7" noValidate>
      <div aria-live="polite">
        {state.message && (
          <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-800">
            {state.message}
          </p>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field sm:col-span-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            required
            minLength={3}
            aria-describedby={
              state.errors?.title ? "title-error" : "title-help"
            }
          />
          <p id="title-help" className="muted text-xs">
            A short description of the requested work.
          </p>
          {state.errors?.title && (
            <p id="title-error" className="field-error">
              {state.errors.title[0]}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="customerId">Customer</label>
          <select id="customerId" name="customerId" defaultValue="" required>
            <option value="" disabled>
              Choose a customer
            </option>
            {customers.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {state.errors?.customerId && (
            <p className="field-error">{state.errors.customerId[0]}</p>
          )}
        </div>
        <div className="field">
          <label htmlFor="serviceId">Service</label>
          <select id="serviceId" name="serviceId" defaultValue="" required>
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((s) => (
              <option value={s.id} key={s.id}>
                {s.name} · ${s.price}
              </option>
            ))}
          </select>
          {state.errors?.serviceId && (
            <p className="field-error">{state.errors.serviceId[0]}</p>
          )}
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="scheduledFor">
            Scheduled for{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input id="scheduledFor" name="scheduledFor" type="datetime-local" />
          {state.errors?.scheduledFor && (
            <p className="field-error">{state.errors.scheduledFor[0]}</p>
          )}
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="description">
            Description{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            maxLength={1000}
          />
          {state.errors?.description && (
            <p className="field-error">{state.errors.description[0]}</p>
          )}
        </div>
      </div>
      <div className="mt-7 flex justify-end">
        <button className="button min-w-40" disabled={pending}>
          {pending ? "Creating…" : "Create work order"}
        </button>
      </div>
    </form>
  );
}

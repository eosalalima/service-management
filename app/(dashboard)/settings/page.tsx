import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
export const metadata: Metadata = { title: "Settings" };
export default function SettingsPage() {
  return (
    <>
      <PageHeading
        eyebrow="Workspace"
        title="Settings"
        description="Configure workspace preferences and integrations."
      />
      <section className="card max-w-2xl p-6">
        <h2 className="font-bold">Workspace settings</h2>
        <p className="muted mt-2">
          Configuration controls are intentionally left as a starter
          placeholder. Add authentication and authorization before exposing
          administrative settings.
        </p>
      </section>
    </>
  );
}

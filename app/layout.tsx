import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Service Management", template: "%s | Service Management" },
  description:
    "A practical dashboard for customers, services, and work orders.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

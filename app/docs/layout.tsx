import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dokumentasi Internal",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Progress Management App",
  description:
    "This is a Student Progress management app where you can track students journey in competative programming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

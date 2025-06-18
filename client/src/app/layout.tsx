import { Inter } from "next/font/google";
import "./globals.css";
import ClientRootLayout from "./ClientRootLayout";

export const metadata = {
  title: "Your App",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground">
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}

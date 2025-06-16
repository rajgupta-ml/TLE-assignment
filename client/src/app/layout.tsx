import { Inter } from "next/font/google";
import "./globals.css";
import ClientRootLayout from "./ClientRootLayout";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth V5 Tutorial",
  description: "Learn - Auth V5 Tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const databaseUrl = process.env.DATABASE_URL;
  console.log("db", databaseUrl);
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

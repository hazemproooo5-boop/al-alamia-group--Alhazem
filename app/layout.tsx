import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../src/index.css";

export const metadata: Metadata = {
  title: "الحازم سمارت | قبل أن تشتري... اسأل الحازم",
  description: "منصة الحازم سمارت للبحث والمقارنة والاستشارة حول الأجهزة الكهربائية والتكييف واحتياجات المنزل.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

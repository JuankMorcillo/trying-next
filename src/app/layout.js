'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { SessionProvider } from "next-auth/react"
import Header from "@/components/ui/header";
import Menu_Botones from "@/components/ui/menu_botones";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <DataProvider>
            <Header />
            <Menu_Botones />
            {children}
          </DataProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

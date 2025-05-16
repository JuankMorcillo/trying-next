'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { SessionProvider } from "next-auth/react"
import Header from "@/components/ui/header";
import Menu_Botones from "@/components/ui/menu_botones";
import Llamada from "@/components/ui/llamada";
import firebaseConnection from "@/lib/utils/firebaseConnection";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {

  useEffect(() => {

    firebaseConnection()

  }, [])


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
            <Llamada />
          </DataProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

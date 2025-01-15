"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext, UserContextProvider } from "./contexts/user-context";
import { Header } from "./common/Header";
import { Footer } from "./common/Footer";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[430px] mx-auto w-full`}
      >
        <UserContextProvider>
          <main className="py-20">{children}</main>
        </UserContextProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}

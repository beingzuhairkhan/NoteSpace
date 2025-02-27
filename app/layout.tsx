import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"



export const metadata: Metadata = {
  title: "Note Space",
  description: "Note Space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
     <html lang="en">
      <body>
        <Header/>
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 p-4 bg-white border border-gray-300 overflow-y-auto scrollbar-hide " >
        {children}
        </div>
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
    </ClerkProvider>
  );
}

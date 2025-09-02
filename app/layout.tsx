import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'sonner'

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SIMPLIX",
  description:
    "Simplix simplifies your PDFs into short, visual summaries that are easy to swipe through and understand instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className="flex flex-col relative min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>

            <Footer />
          </div>
{/* Ensure Toaster is used correctly and not passed objects as children */}
<Toaster richColors position="top-right" closeButton offset={60} />

        </body>
      </html>
    </ClerkProvider>
  );
}

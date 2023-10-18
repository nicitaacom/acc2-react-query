import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Layout from "./components/Layout"
import { Toaster } from "./components/ui/Toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "acc2-react-query",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

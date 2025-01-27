import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Navbar from "@/components/Navbar"
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Create Setlink',
  description: 'Create your own setlink page',
}



export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

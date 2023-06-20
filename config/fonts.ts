import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["iranyekan"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

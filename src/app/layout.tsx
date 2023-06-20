export const metadata = {
  title: 'سامانه فروش کارخانه آجر کاشانه',
  description: 'کارخانه آجر ماشینی کاشانه کوهدشت',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

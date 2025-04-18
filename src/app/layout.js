import './globals.css'
import { EB_Garamond } from 'next/font/google'

const EB_garamond = EB_Garamond({ subsets: ['latin'] })

export const metadata = {
  title: 'Fufufafa Quotes',
  description: 'Brighten your day with quotes from Fufufafa',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={EB_garamond.className}>{children}</body>
    </html>
  )
}

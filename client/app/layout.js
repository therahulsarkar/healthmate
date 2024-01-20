import { Marcellus, Inter, Poppins } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ['latin'],  variable: '--font-second', weight: ['300', '400', '500'],  display: 'swap' })

export const metadata = {
  title: "Health Mate",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  ${poppins.variable}`}>{children}</body>
    </html>
  );
}

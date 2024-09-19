import localFont from "next/font/local";
import "./globals.css";

import { Providers } from "@/state/provider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-gray-100"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

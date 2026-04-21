import type { Metadata } from "next";
import { Crimson_Text, Poppins } from "next/font/google";
import "./globals.css";

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600"]
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200","400","600"]
});

export const metadata: Metadata = {
  title: "Noumi's Portfolio",
  description: "Noumisyifa Nareswari - developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimsonText.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col px-12 py-12">{children}</body>
    </html>
  );
}

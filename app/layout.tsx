import type { Metadata } from "next";
import "./globals.css";
import { Auth } from "@/components/Auth";

export const metadata: Metadata = {
  title: "Chat Amplify App",
  description: "Chat using AppSync Events API and Amplify AI kit",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Auth>{children}</Auth>
      </body>
    </html>
  );
}

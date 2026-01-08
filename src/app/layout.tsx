import type { Metadata } from "next";
import AuthProvider from "@Providers/AuthProvider";
import StyledComponentsRegistry from "@Providers/StyledComponentsRegistry";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GlamVault",
  description: "GlamVault",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <AuthProvider>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}

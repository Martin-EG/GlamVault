import AuthProvider from "@Providers/AuthProvider";
import StyledComponentsRegistry from "@Providers/StyledComponentsRegistry";
import ThemeProvider from "@Providers/ThemeProvider";
import type { Metadata } from "next";
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
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}

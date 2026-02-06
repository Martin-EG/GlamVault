import { GlobalStyles } from '@/GlamUI/styles/GlobalStyles';
import AuthProvider from '@/providers/AuthProvider';
import StyledComponentsRegistry from '@/providers/StyledComponentsRegistry';
import ThemeProvider from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GlamVault',
  description: 'GlamVault',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${nunito.className} antialiased h-dvh`}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <GlobalStyles />
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

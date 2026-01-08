"use client";

import { theme, GlobalStyles } from '@/GlamUI'
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
}

'use client';

import styledComponents from 'styled-components';

const { createGlobalStyle } = styledComponents as any;

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${({ theme }: { theme: any }) => theme.fonts.primary};
    color: ${({ theme }: { theme: any }) => theme.colors.text.primary};
    background: ${({ theme }: { theme: any }) => theme.colors.text.inverse};
  }`;

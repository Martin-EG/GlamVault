import { useBreakpoint } from './useBreakpoint';

export function useResponsive() {
  const isMd = useBreakpoint('md');
  const isLg = useBreakpoint('lg');
  const isXl = useBreakpoint('xl');

  return {
    isMobile: !isMd,
    isTablet: isMd && !isLg,
    isDesktop: isLg,
    isWide: isXl,
  };
}

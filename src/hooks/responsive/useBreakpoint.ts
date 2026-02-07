import { breakpoints, type Breakpoint } from '@/GlamUI/styles/breakpoints';
import { useMediaQuery } from './useMediaQuery';

export function useBreakpoint(bp: Breakpoint) {
  const minWidth = breakpoints[bp];
  return useMediaQuery(`(min-width: ${minWidth}px)`);
}

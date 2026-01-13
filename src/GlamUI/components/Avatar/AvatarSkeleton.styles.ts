import styled, { keyframes } from 'styled-components';
import type { AvatarSize } from './Avatar.types';

const SIZE_MAP: Record<AvatarSize, string> = {
  sm: '40px',
  md: '72px',
  lg: '120px',
};

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

export const SkeletonRoot = styled.div<{ $size: AvatarSize }>`
  width: ${({ $size }) => SIZE_MAP[$size]};
  height: ${({ $size }) => SIZE_MAP[$size]};
  border-radius: 50%;

  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface.muted} 25%,
    ${({ theme }) => theme.colors.surface.default} 37%,
    ${({ theme }) => theme.colors.surface.muted} 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

import styled from 'styled-components';

import type { AvatarSize } from './Avatar.types';

const SIZE_MAP: Record<AvatarSize, string> = {
  sm: '40px',
  md: '72px',
  lg: '120px',
};

interface StyledAvatarProps {
  readonly $size: AvatarSize;
  readonly $clickable: boolean;
}

export const AvatarRoot = styled.div.attrs<StyledAvatarProps>(
  ({ $clickable }) => ({
    role: $clickable ? 'button' : 'img',
    tabIndex: $clickable ? 0 : -1,
    'aria-label': $clickable ? 'Sube una foto de perfil' : undefined,
  })
) <StyledAvatarProps>`
  width: ${({ $size }) => SIZE_MAP[$size]};
  height: ${({ $size }) => SIZE_MAP[$size]};
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.surface.muted};
  border: 2px ${({ $clickable }) => ($clickable ? 'dashed' : 'solid')} ${({ theme }) => theme.colors.border.muted};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  position: relative;
  overflow: hidden;

  transition:
    border-color 160ms ease,
    background-color 160ms ease;

  &:hover {
    border-color: ${({ theme, $clickable }) =>
    $clickable ? theme.colors.brand.primary : theme.colors.border.muted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarPlaceholder = styled.div`
  width: 32px;
  height: 32px;

  background: url('/camera.svg') center / contain no-repeat;
  color: ${({ theme }) => theme.colors.text.muted};
  opacity: 0.7;

  pointer-events: none;
`;

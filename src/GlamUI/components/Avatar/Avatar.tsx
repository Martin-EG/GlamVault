'use client';

import { FC } from 'react';

import { AvatarRoot, AvatarImage, AvatarPlaceholder } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';
import AvatarSkeleton from './AvatarSkeleton';

const Avatar: FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  editable = false,
  loading = false,
  onClick,
}) => {
  if (loading) {
    return <AvatarSkeleton size={size} />;
  }

  const clickable = editable && !!onClick;

  return (
    <AvatarRoot
      as={clickable ? 'button' : 'div'}
      type={clickable ? 'button' : undefined}
      onClick={clickable ? onClick : undefined}
      aria-label={clickable ? 'Cambiar foto de perfil' : undefined}
      $size={size}
      $clickable={clickable}
    >
      {src ? (
        <AvatarImage src={src} alt={alt} />
      ) : (
        <AvatarPlaceholder aria-hidden />
      )}
    </AvatarRoot>
  );
};

export default Avatar;

import { ImgHTMLAttributes, ReactNode } from 'react';

import type { MenuItem } from '../Menu/Menu.types';

/**
 * Card types
 */

export interface CardProps {
  readonly title: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly body: ReactNode;
  readonly footer?: ReactNode;
  readonly options?: MenuItem[];
}

export interface CardImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt'
> {
  readonly src?: string;
  readonly alt?: string;
}

export interface CardBodyProps {
  readonly title?: string;
  readonly children: ReactNode;
  readonly options?: MenuItem[];
}

export interface CardFooterProps {
  readonly children: ReactNode;
}

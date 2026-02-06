import { iconSizes, type IconProps } from './Icon.types';

export function Star({ size = 'sm', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Star</title>
      <path
        d="M8.5 2.5L10.3 6.2L14.5 6.8L11.5 9.7L12.2 13.9L8.5 11.9L4.8 13.9L5.5 9.7L2.5 6.8L6.7 6.2L8.5 2.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

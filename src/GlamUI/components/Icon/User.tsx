import { iconSizes, type IconProps } from './Icon.types';

export function User({ size = 'sm', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>User</title>
      <path
        d="M8.5 9.5C10.433 9.5 12 7.933 12 6C12 4.067 10.433 2.5 8.5 2.5C6.567 2.5 5 4.067 5 6C5 7.933 6.567 9.5 8.5 9.5Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M2.5 14.5C2.5 11.7386 5.18629 10 8.5 10C11.8137 10 14.5 11.7386 14.5 14.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

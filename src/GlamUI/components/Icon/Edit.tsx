import { iconSizes, type IconProps } from './Icon.types';

export function Edit({ size = 'sm', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Edit</title>
      <path
        d="M8.39932 2.74404H2.64429C2.2082 2.74404 1.78997 2.91728 1.4816 3.22564C1.17324 3.53401 1 3.95224 1 4.38833V15.8984C1 16.3345 1.17324 16.7527 1.4816 17.0611C1.78997 17.3694 2.2082 17.5427 2.64429 17.5427H14.1544C14.5904 17.5427 15.0087 17.3694 15.317 17.0611C15.6254 16.7527 15.7986 16.3345 15.7986 15.8984V10.1434M14.5654 1.51082C14.8925 1.18375 15.3361 1 15.7986 1C16.2612 1 16.7048 1.18375 17.0319 1.51082C17.3589 1.83789 17.5427 2.28149 17.5427 2.74404C17.5427 3.20659 17.3589 3.65019 17.0319 3.97726L9.22147 11.7877L5.93288 12.6098L6.75503 9.32122L14.5654 1.51082Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

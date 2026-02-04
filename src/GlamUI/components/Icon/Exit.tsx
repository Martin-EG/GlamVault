import { iconSizes, type IconProps } from './Icon.types'

export function Exit({ size = 'sm', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 2.5H3.5C2.9 2.5 2.5 2.9 2.5 3.5V13.5C2.5 14.1 2.9 14.5 3.5 14.5H6"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M10 11.5L13.5 8.5L10 5.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M13.5 8.5H6" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}
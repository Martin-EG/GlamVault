import { iconSizes, type IconProps } from './Icon.types'

export function Box({ size = 'sm', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 5.5L8.5 2.5L14.5 5.5V11.5L8.5 14.5L2.5 11.5V5.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.5 14.5V8.5" stroke={color} strokeWidth="1.5" />
      <path d="M2.5 5.5L8.5 8.5L14.5 5.5" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}
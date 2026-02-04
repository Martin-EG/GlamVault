import { iconSizes, type IconProps } from './Icon.types'

export function Camera({ size = 'sm', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <title>Camera</title>
      <path
        d="M4 7C4 5.89543 4.89543 5 6 5H8.5L9.7 3.8C10.0789 3.42108 10.5906 3.20801 11.125 3.20801H12.875C13.4094 3.20801 13.9211 3.42108 14.3 3.8L15.5 5H18C19.1046 5 20 5.89543 20 7V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V7Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3.5"
        stroke={color}
        stroke-width="1.5"
      />
    </svg>
  )
}
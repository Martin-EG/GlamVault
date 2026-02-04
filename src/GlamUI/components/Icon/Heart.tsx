import { iconSizes, type IconProps } from './Icon.types'

export function Heart({ size = 'sm', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 6C14.5 9.5 8.5 13.5 8.5 13.5C8.5 13.5 2.5 9.5 2.5 6C2.5 4.3 3.9 2.9 5.6 2.9C6.9 2.9 8 3.7 8.5 4.8C9 3.7 10.1 2.9 11.4 2.9C13.1 2.9 14.5 4.3 14.5 6Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
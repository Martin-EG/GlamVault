import { iconSizes, type IconProps } from './Icon.types'

export function Remove({ size = 'sm', color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3525 0.5V1.48633H15.2852V2.45996H14.2988V15.7852C14.2988 16.1941 14.1586 16.5318 13.8652 16.8252C13.5719 17.1185 13.2341 17.2588 12.8252 17.2588H2.95996C2.55104 17.2588 2.21329 17.1185 1.91992 16.8252C1.62653 16.5318 1.48633 16.1941 1.48633 15.7852V2.45996H0.5V1.48633H5.43262V0.5H10.3525ZM2.45996 16.2852H13.3252V2.45996H2.45996V16.2852ZM10.3525 5.43262V13.3125H9.37891V5.43262H10.3525ZM6.40625 5.43262V13.3125H5.43262V5.43262H6.40625Z"
        stroke={color}
      />
    </svg>
  )
}
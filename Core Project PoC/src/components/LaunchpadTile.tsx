import { ReactNode } from 'react'

interface LaunchpadTileProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  iconBgColor?: string
  updatedText?: string
  badge?: string
  onClick?: () => void
  className?: string
  isWide?: boolean
}

export default function LaunchpadTile({
  title,
  subtitle,
  icon,
  iconBgColor = '#c5d4e0',
  updatedText,
  onClick,
  className = '',
  isWide = false,
}: LaunchpadTileProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer relative overflow-hidden flex flex-col min-h-[140px] border border-gray-200 ${
        isWide ? 'col-span-1 md:col-span-2 lg:col-span-2' : ''
      } ${className}`}
    >
      {/* Content */}
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-0.5">{title}</h3>
          {subtitle && <p className="text-xs text-gray-700 font-normal">{subtitle}</p>}
        </div>

        {/* Bottom section with icon and updated text */}
        <div className="flex items-end justify-between mt-3">
          {icon && (
            <div
              className="w-10 h-10 rounded-sm flex items-center justify-center"
              style={{ backgroundColor: iconBgColor }}
            >
              <div className="text-gray-600">{icon}</div>
            </div>
          )}
          {updatedText && (
            <div className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">
              {updatedText}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

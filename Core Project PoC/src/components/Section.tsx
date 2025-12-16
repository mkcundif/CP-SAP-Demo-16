import { ReactNode } from 'react'

interface SectionProps {
  title: string
  children: ReactNode
}

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 px-8">
        {title}
      </h2>
      <div className="px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {children}
        </div>
      </div>
    </div>
  )
}

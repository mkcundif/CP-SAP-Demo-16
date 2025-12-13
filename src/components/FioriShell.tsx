import { Search, MessageSquare, HelpCircle, Bell } from 'lucide-react'

export type TabType = 'internal-sales' | 'account-payable' | 'sourcing'

interface FioriShellProps {
  children: React.ReactNode
  onTabChange: (tab: TabType) => void
  activeTab: TabType
}

export default function FioriShell({ children, onTabChange, activeTab }: FioriShellProps) {
  const tabs: { value: TabType; label: string }[] = [
    { value: 'internal-sales', label: 'Internal Sales' },
    { value: 'account-payable', label: 'Account Payable' },
    { value: 'sourcing', label: 'Sourcing and Contracting' },
  ]

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Shell Bar - Fixed Top */}
      <header
        className="fixed top-0 left-0 right-0 z-50 text-white shadow-sm"
        style={{ height: '48px', backgroundColor: '#364a5e' }}
      >
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left: SAP Logo and Home */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold" style={{ color: '#ffffff' }}>SAP</span>
            </div>
            <div className="flex items-center gap-1 text-gray-300 text-xs">
              <span>Home</span>
              <span>▼</span>
            </div>
          </div>

          {/* Right: Icon Buttons */}
          <div className="flex items-center gap-4">
            <button className="p-1 hover:bg-gray-700 rounded transition-colors" title="Search">
              <Search size={18} style={{ color: '#ffffff' }} />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded transition-colors" title="Messages">
              <MessageSquare size={18} style={{ color: '#ffffff' }} />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded transition-colors" title="Help">
              <HelpCircle size={18} style={{ color: '#ffffff' }} />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded transition-colors relative" title="Notifications">
              <Bell size={18} style={{ color: '#ffffff' }} />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              style={{ backgroundColor: '#e8934f' }}
              title="User Profile"
            >
              SC
            </div>
          </div>
        </div>
      </header>

      {/* Tab Bar - Below Shell */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 border-b"
        style={{ top: '48px', height: '40px', backgroundColor: '#485563', borderColor: '#3a4a5a' }}
      >
        <div className="h-full px-6 flex items-center gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`px-5 h-full text-xs font-medium transition-colors border-b-2 ${
                activeTab === tab.value
                  ? 'border-b-white text-white'
                  : 'border-b-transparent text-gray-300 hover:text-white'
              }`}
              style={{
                backgroundColor: activeTab === tab.value ? '#3a4a5a' : 'transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto w-full" style={{ paddingTop: '88px' }}>
        {children}
      </main>
    </div>
  )
}

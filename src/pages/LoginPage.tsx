import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Do not auto-redirect on load; require explicit login each visit

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Simple validation - accept any non-empty username/password for demo
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password')
      setIsLoading(false)
      return
    }

    // Demo credentials (optional - accept any for PoC)
    if (username.trim() && password.length >= 1) {
        // Store auth state in sessionStorage (clears on browser session end)
        sessionStorage.setItem('isAuthenticated', 'true')
        sessionStorage.setItem('username', username)
        navigate('/home')
    } else {
      setError('Invalid username or password')
      setIsLoading(false)
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {/* Logo Section */}
      <div className="mb-8 text-center">
        <div
          className="text-4xl font-bold mb-2"
          style={{ color: '#364a5e' }}
        >
          SAP
        </div>
        <h1 className="text-2xl font-bold text-gray-800">TMHNA Financial Intelligence</h1>
        <p className="text-sm text-gray-600 mt-1">TMH + Raymond Merger Integration</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-white rounded shadow-lg p-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <LogIn size={24} style={{ color: '#364a5e' }} />
          Sign In
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Username Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleLogin(e as any)
              }}
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
            style={{ backgroundColor: isLoading ? '#999' : '#1e5a96' }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-600 text-center mb-3">Demo Credentials:</p>
          <div className="bg-blue-50 rounded p-3 text-xs text-gray-700 space-y-1">
            <p><span className="font-semibold">Username:</span> any username</p>
            <p><span className="font-semibold">Password:</span> any password</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-600">
            SAP Financial Intelligence Platform
          </p>
          <p className="text-xs text-gray-500 mt-1">© 2025 TMHNA</p>
        </div>
      </div>
    </div>
  )
}

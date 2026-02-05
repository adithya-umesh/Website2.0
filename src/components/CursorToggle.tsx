'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'vegavath:cursor-enabled'

interface CursorToggleProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

/**
 * CursorToggle - Subtle iOS 18-style toggle for racing cursor
 * 
 * Features:
 * - Desktop only (hidden on touch devices)
 * - Fixed bottom-right position
 * - Persistent preference via localStorage
 * - Smooth transition animation
 * - Keyboard accessible
 */
export default function CursorToggle({ enabled, onToggle }: CursorToggleProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(hasTouch)
  }, [])

  // Don't render on touch devices
  if (isTouchDevice) return null

  const handleToggle = () => {
    const newState = !enabled
    onToggle(newState)
    
    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    } catch (e) {
      // Silent fail if localStorage is unavailable
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[9998]">
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={enabled}
        aria-label={enabled ? 'Disable racing cursor' : 'Enable racing cursor'}
        className="flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full"
      >
        {/* Label - Always visible, placed LEFT of toggle */}
        <span className="text-xs text-gray-400 font-medium select-none">
          Cursor
        </span>
        
        {/* Toggle switch - Scaled down ~35-40% */}
        <div
          className={`
            relative w-9 h-5 rounded-full transition-all duration-300 ease-out
            ${enabled 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_0_12px_rgba(255,107,53,0.4)]' 
              : 'bg-gray-700 hover:bg-gray-600'
            }
          `}
        >
          {/* Knob */}
          <div
            className={`
              absolute top-0.5 w-4 h-4 rounded-full bg-white
              transition-all duration-300 ease-out
              shadow-lg
              ${enabled ? 'left-[18px]' : 'left-0.5'}
            `}
          />
        </div>
      </button>
    </div>
  )
}

// Hook to manage cursor preference
export function useCursorPreference() {
  const [enabled, setEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Read from localStorage on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        setEnabled(JSON.parse(stored))
      }
    } catch (e) {
      // Silent fail, default to false
    }
    setIsLoading(false)
  }, [])

  return { enabled, setEnabled, isLoading }
}

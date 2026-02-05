'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Providers } from './Providers'
import RacingCursor from './RacingCursor'
import CursorToggle, { useCursorPreference } from './CursorToggle'

// Minimal client wrapper used by the root layout. Keep this intentionally small
// to avoid importing many client-only components here; expand later if needed.
export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const { enabled, setEnabled, isLoading } = useCursorPreference()
  const pathname = usePathname()
  
  // Routes where cursor system is disabled for performance (heavy animations/media)
  const cursorDenylist = ['/crew', '/gallery']
  const cursorAllowed = !cursorDenylist.some(path => pathname.startsWith(path))

  return (
    <Providers>
      {/* Cursor system disabled on heavy routes for performance */}
      {cursorAllowed && !isLoading && <RacingCursor enabled={enabled} />}
      
      {/* Cursor toggle hidden on heavy routes */}
      {cursorAllowed && !isLoading && <CursorToggle enabled={enabled} onToggle={setEnabled} />}
      
      {children}
    </Providers>
  )
}

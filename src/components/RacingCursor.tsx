'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * RacingCursor - F1-style custom cursor with velocity-based motion physics
 * 
 * Performance optimizations:
 * - Idle-aware frame skipping for VSYNC scaling
 * - DOM write deduplication (cache last values)
 * - Heavy route auto-degradation (/crew, /gallery)
 * - Visibility-aware pause
 * 
 * Features:
 * - Desktop only (automatically disabled on touch devices)
 * - Velocity-based scaling (faster movement = larger cursor)
 * - Inertia/trailing motion for smooth follow
 * - Zoom punch on direction change or speed burst
 * - High-speed blur effect
 */
export default function RacingCursor({ enabled = false }: { enabled?: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const prevVelocity = useRef({ x: 0, y: 0 })
  const scale = useRef(1)
  const targetScale = useRef(1)
  const requestRef = useRef<number | undefined>(undefined)
  
  // Performance tracking
  const lastMoveTime = useRef(Date.now())
  const lastApplied = useRef({
    x: 0,
    y: 0,
    scale: 1,
    filter: '',
    textShadow: ''
  })

  useEffect(() => {
    // Detect touch devices
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(hasTouch)
    
    if (hasTouch) return
    
    // Only apply cursor styles when enabled
    if (!enabled) return

    // Hide default cursor on desktop
    document.body.style.cursor = 'none'
    document.documentElement.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      lastMoveTime.current = Date.now()
    }

    const animate = () => {
      if (!cursorRef.current) return
      
      // Visibility-aware pause: skip if tab not visible
      if (document.visibilityState !== 'visible') {
        requestRef.current = requestAnimationFrame(animate)
        return
      }

      // Inertia / trailing motion (slower ease = more lag/trailing)
      const ease = 0.12
      const dx = mousePos.current.x - cursorPos.current.x
      const dy = mousePos.current.y - cursorPos.current.y
      
      // Calculate movement distance
      const movementDist = Math.sqrt(dx ** 2 + dy ** 2)
      const timeSinceMove = Date.now() - lastMoveTime.current
      
      // IDLE-AWARE FRAME SKIPPING: Skip frame if barely moving or idle
      if (movementDist < 0.5 || timeSinceMove > 120) {
        requestRef.current = requestAnimationFrame(animate)
        return
      }

      cursorPos.current.x += dx * ease
      cursorPos.current.y += dy * ease

      // Calculate actual velocity (movement per frame)
      velocity.current.x = dx * ease
      velocity.current.y = dy * ease
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
      
      // HEAVY ROUTE AUTO-DEGRADATION: Detect heavy pages
      const pathname = window.location.pathname
      const isHeavyRoute = pathname === '/crew' || pathname === '/gallery'

      // Velocity-based scaling
      let baseScale: number
      let maxScale: number
      let punchIntensity = 0
      
      if (isHeavyRoute) {
        // Heavy route: simplified scaling, no punch
        maxScale = 1.15
        baseScale = 1 + Math.min(speed * 0.05, maxScale - 1)
      } else {
        // Normal route: full effects
        maxScale = 1.4
        baseScale = 1 + Math.min(speed * 0.08, maxScale - 1)
        
        // Detect direction change or speed burst for "zoom punch"
        const velocityChange = Math.abs(
          (velocity.current.x - prevVelocity.current.x) +
          (velocity.current.y - prevVelocity.current.y)
        )
        punchIntensity = Math.min(velocityChange * 0.15, 0.2)
      }
      
      // Update target scale with punch effect
      targetScale.current = baseScale + punchIntensity
      
      // Smooth scale transition (prevents jitter)
      scale.current += (targetScale.current - scale.current) * 0.2
      
      // Prepare transform and effect values
      const newX = cursorPos.current.x
      const newY = cursorPos.current.y
      const newScale = scale.current
      const newTransform = `translate3d(${newX}px, ${newY}px, 0) scale(${newScale})`
      
      let newFilter = ''
      let newTextShadow = ''
      
      // High-speed blur effect (disabled on heavy routes)
      if (!isHeavyRoute) {
        const blurAmount = Math.min(speed * 0.3, 4)
        const shouldBlur = speed > 3
        
        if (shouldBlur) {
          newFilter = `blur(${blurAmount * 0.3}px)`
          newTextShadow = `0 0 ${blurAmount}px rgba(255, 107, 53, 0.6)`
        }
      }
      
      // DOM WRITE DEDUPLICATION: Only update if values changed
      const hasChanged = (
        Math.abs(newX - lastApplied.current.x) > 0.1 ||
        Math.abs(newY - lastApplied.current.y) > 0.1 ||
        Math.abs(newScale - lastApplied.current.scale) > 0.001 ||
        newFilter !== lastApplied.current.filter ||
        newTextShadow !== lastApplied.current.textShadow
      )
      
      if (hasChanged) {
        cursorRef.current.style.transform = newTransform
        
        if (newFilter !== lastApplied.current.filter) {
          cursorRef.current.style.filter = newFilter || 'blur(0px)'
        }
        
        if (newTextShadow !== lastApplied.current.textShadow) {
          cursorRef.current.style.textShadow = newTextShadow || 'none'
        }
        
        // Update cache
        lastApplied.current.x = newX
        lastApplied.current.y = newY
        lastApplied.current.scale = newScale
        lastApplied.current.filter = newFilter
        lastApplied.current.textShadow = newTextShadow
      }
      
      // Store previous velocity for next frame
      prevVelocity.current.x = velocity.current.x
      prevVelocity.current.y = velocity.current.y

      requestRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      // Restore default cursor
      document.body.style.cursor = ''
      document.documentElement.style.cursor = ''
    }
  }, [enabled])

  // Don't render on touch devices or when disabled
  if (isTouchDevice || !enabled) return null

  return (
    <>
      {/* Custom cursor - F1 Car */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: 'translate3d(0px, 0px, 0) scale(1)',
          willChange: 'transform, filter',
          transition: 'filter 0.1s ease-out',
        }}
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 text-3xl select-none">
          🏎️
        </div>
      </div>

      {/* Global cursor style */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}

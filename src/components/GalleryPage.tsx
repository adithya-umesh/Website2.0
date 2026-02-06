'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from './Navigation'
import SkeletonCard from './SkeletonCard'
import { getGalleryItems, GalleryItem } from '@/lib/supabase'

interface EventData {
  eventName: string
  eventDate: Date | null // null means upcoming/TBA
  items: GalleryItemWithSkeleton[]
}

// Extend GalleryItem to support skeleton mode safely
interface GalleryItemWithSkeleton extends GalleryItem {
  isSkeleton?: boolean
}

// Event dates configuration for proper sorting (completed events first, then upcoming)
const EVENT_DATES: Record<string, Date | null> = {
  'Ignition 1.0': new Date(2025, 10, 1), // November 2025
  'Bootstrap': new Date(2025, 8, 1), // September 2025 (displayed as Bootstrap '25)
  'Bootstrap 2024': new Date(2024, 8, 1), // September 2024
  'Freshers Day 2025': new Date(2025, 9, 17), // October 2025
  'IKC 2020': new Date(2020, 0, 1), // IKC 2020
  'EmbedX 2.0': null, // Upcoming/TBA
}

// Filter options
const FILTER_OPTIONS = ['All', 'Ignition 1.0', "Bootstrap '25", 'Bootstrap 2024', "Freshers Day '25", "IKC '20", 'EmbedX 2.0'] as const
type FilterOption = typeof FILTER_OPTIONS[number]

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItemWithSkeleton[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [groupedByEvent, setGroupedByEvent] = useState<EventData[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All')

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const groupGalleryByEvent = (items: GalleryItemWithSkeleton[]): EventData[] => {
    const eventGrouped: { [eventName: string]: GalleryItemWithSkeleton[] } = {}

    items.forEach(item => {
      if (!eventGrouped[item.event_name]) {
        eventGrouped[item.event_name] = []
      }
      eventGrouped[item.event_name].push(item)
    })

    // Ensure EmbedX 2.0 exists even if no images
    if (!eventGrouped['EmbedX 2.0']) {
      eventGrouped['EmbedX 2.0'] = []
    }

    return Object.keys(eventGrouped)
      .map(eventName => {
        const eventDate = EVENT_DATES[eventName] ?? null
        let eventItems = eventGrouped[eventName].sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        return {
          eventName,
          eventDate,
          items: eventItems,
        }
      })
      // Sort: completed events by date descending, then upcoming events
      .sort((a, b) => {
        // Both have dates - sort by date descending (latest first)
        if (a.eventDate && b.eventDate) {
          return b.eventDate.getTime() - a.eventDate.getTime()
        }
        // a has date, b is upcoming - completed comes first
        if (a.eventDate && !b.eventDate) return -1
        // a is upcoming, b has date - completed comes first
        if (!a.eventDate && b.eventDate) return 1
        // Both upcoming - maintain order
        return 0
      })
  }

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        setLoading(true)
        const items = await getGalleryItems()
        setGalleryItems(items)
        setGroupedByEvent(groupGalleryByEvent(items))
      } catch (error) {
        console.error('Error fetching gallery items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item)
  }

  const closeLightbox = useCallback(() => {
    setSelectedItem(null)
  }, [])

  // Filter events based on active filter
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All') return groupedByEvent
    
    // Map filter name to event name
    const filterToEventName: Record<string, string> = {
      'Ignition 1.0': 'Ignition 1.0',
      "Bootstrap '25": 'Bootstrap',
      'Bootstrap 2024': 'Bootstrap 2024',
      "Freshers Day '25": 'Freshers Day 2025',
      "IKC '20": 'IKC 2020',
      'EmbedX 2.0': 'EmbedX 2.0',
    }
    const targetEventName = filterToEventName[activeFilter]
    return groupedByEvent.filter(event => event.eventName === targetEventName)
  }, [groupedByEvent, activeFilter])

  // ESC key handler for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    }

    if (selectedItem) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedItem, closeLightbox])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-black flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-black">
      <Navigation />

      {/* Hero Section */}
      <section ref={headerRef} className="pt-10 pb-8 px-4 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            <motion.path
              d="M 0 200 Q 300 100 600 200 T 1200 200"
              stroke="url(#heroGradient)"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3 }}
            />
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FF4500" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 modern-title"
            style={{
              textShadow: '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.4), 0 0 60px rgba(255, 107, 53, 0.2)'
            }}
          >
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-orange relative inline-block"
              whileHover={{
                scale: 1.05,
                textShadow: '0 0 30px rgba(255, 107, 53, 0.8)'
              }}
            >
              Gallery
            </motion.span>
          </motion.h1>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 border ${
                  activeFilter === filter
                    ? 'bg-gradient-orange text-white border-orange-500 shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800/50 text-gray-300 border-gray-600 hover:border-orange-500/50 hover:text-orange-400 hover:bg-gray-700/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 modern-body"
          >
            A visual journey through our projects, events, workshops, and memorable moments
            that define the Vegavath experience.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid Organized by Event */}
      <section className="py-16 px-4 relative">
        {/* Background ambient effects */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-24">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-gray-400 text-xl"
              >
                No gallery items found.
              </motion.p>
            </div>
          ) : (
            <motion.div layout className="space-y-20">
              {filteredEvents.map((eventData, eventIndex) => (
                <motion.div
                  key={eventData.eventName}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: eventIndex * 0.1 }}
                  className="space-y-6"
                >
                  {/* Event Header */}
                  <div className="relative flex items-center gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white whitespace-nowrap modern-title">
                      <span className="text-transparent bg-clip-text bg-gradient-orange">
                        {eventData.eventName === 'Bootstrap' ? "Bootstrap '25" : eventData.eventName === 'IKC 2020' ? "IKC '20" : eventData.eventName}
                      </span>
                      <span className="text-gray-400 text-sm italic font-normal ml-3">
                        (
                        {eventData.eventDate
                          ? eventData.eventDate.toLocaleDateString('default', {
                              month: 'long',
                              year: 'numeric'
                            })
                          : 'Upcoming'
                        }
                        )
                      </span>
                    </h2>
                  </div>

                  {/* Grid Layout */}
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-stretch"
                  >
                    {/* Empty state for events with no images (e.g., EmbedX 2.0) */}
                    {eventData.items.length === 0 && (
                      <div className="col-span-full">
                        <div className="flex flex-col items-center justify-center py-16 px-8 bg-gray-800/30 rounded-xl border border-gray-700/50">
                          <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-gray-400 text-lg font-medium mb-2">Images Coming Soon</p>
                          <p className="text-gray-500 text-sm text-center max-w-md">
                            Stay tuned! Photos from this event will be added here shortly.
                          </p>
                        </div>
                      </div>
                    )}
                    {eventData.items.map((item, index) => {
                      if (item.isSkeleton) {
                        return (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="cursor-default"
                          >
                            <SkeletonCard />
                          </motion.div>
                        )
                      }

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.5, delay: index * 0.08 }}
                          className="group cursor-pointer flex flex-col gap-6 h-full"
                          onClick={() => openLightbox(item)}
                        >
                          {/* Media Container */}
                          <div className="relative w-full rounded-xl overflow-hidden aspect-video shadow-lg shadow-black/30 flex-shrink-0">
                            {item.image_url ? (
                              <>
                                {item.media_type === 'video' ? (
                                  <video
                                    src={item.image_url}
                                    className="w-full h-full object-cover"
                                    muted
                                    playsInline
                                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                                    onMouseLeave={(e) => {
                                      const video = e.target as HTMLVideoElement;
                                      video.pause();
                                      video.currentTime = 0;
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={item.image_url}
                                    alt={item.caption || 'Gallery image'}
                                    loading="lazy"
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                      target.parentElement?.classList.add('bg-gray-800');
                                    }}
                                  />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                
                                {/* View/Play icon on hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    {item.media_type === 'video' ? (
                                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                    ) : (
                                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                    )}
                                  </div>
                                </div>

                                {/* Video badge */}
                                {item.media_type === 'video' && (
                                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-xs text-white flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                                    </svg>
                                    Video
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800">
                                <svg className="w-12 h-12 text-gray-700/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative max-w-4xl max-h-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-2xl shadow-orange-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors hover:scale-110 transform"
                title="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Media */}
              <div className="relative h-96 bg-gray-800 flex items-center justify-center">
                {selectedItem.image_url ? (
                  selectedItem.media_type === 'video' ? (
                    <video
                      src={selectedItem.image_url}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={selectedItem.image_url}
                      alt={selectedItem.caption || 'Full resolution'}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-20 h-20 text-gray-700/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-8 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400">
                    {selectedItem.event_name}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(selectedItem.created_at).toLocaleDateString('default', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-white text-lg leading-relaxed font-medium">{selectedItem.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
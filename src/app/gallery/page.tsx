import GalleryPage from '@/components/GalleryPage'
import SiteMaintenanceClient from '@/components/SiteMaintenanceClient'

export const metadata = {
  title: 'Gallery | Team Vegavath',
  description: 'Explore our projects, events, and memorable moments captured over the years',
}

export default function Gallery() {
  return (
    <>
      <SiteMaintenanceClient page="gallery" />
      <GalleryPage />
    </>
  )
}
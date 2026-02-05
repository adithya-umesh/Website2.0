import AboutPage from '@/components/AboutPage'
import SiteMaintenanceClient from '@/components/SiteMaintenanceClient'

export const metadata = {
  title: 'About Us - Team Vegavath',
  description: 'Learn about Team Vegavath history, mission, and our sponsors',
}

export default function About() {
  return (
    <>
      <SiteMaintenanceClient page="about" />
      <AboutPage />
    </>
  )
}
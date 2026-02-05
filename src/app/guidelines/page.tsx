import GuidelinesPage from '@/components/GuidelinesPage'
import SiteMaintenanceClient from '@/components/SiteMaintenanceClient'

export const metadata = {
  title: 'Ignition Guidelines - Team Vegavath',
  description: 'Complete guidelines and rules for Ignition 1.0 — an 18-hour IoT hackathon',
}

export default function Guidelines() {
  return (
    <>
      <SiteMaintenanceClient page="guidelines" />
      <GuidelinesPage />
    </>
  )
}
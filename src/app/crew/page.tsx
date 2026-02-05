import CrewPage from '@/components/CrewPage'
import SiteMaintenanceClient from '@/components/SiteMaintenanceClient'

export const metadata = {
  title: 'The Crew - Team Vegavath',
  description: 'Meet the talented team members of Team Vegavath across all domains',
}

export default function Crew() {
  return (
    <>
      <SiteMaintenanceClient page="crew" />
      <CrewPage />
    </>
  )
}
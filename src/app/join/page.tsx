import JoinPage from '@/components/JoinPage'
import SiteMaintenanceClient from '@/components/SiteMaintenanceClient'

export const metadata = {
  title: 'Join Us - Team Vegavath',
  description: 'Apply to join Team Vegavath and be part of our innovative engineering community',
}

export default function Join() {
  return (
    <>
      <SiteMaintenanceClient page="join" />
      <JoinPage />
    </>
  )
}
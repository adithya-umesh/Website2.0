import AdminPage from '@/components/AdminPage'
import SiteMaintenanceClient from '@/components/SiteMaintenanceClient'

export const metadata = {
  title: 'Admin Panel - Vegavath Technical Club',
  description: 'Administrative panel for managing Vegavath Technical Club',
}

export default function SusPage() {
  return (
    <>
      <SiteMaintenanceClient page="sus" />
      <AdminPage />
    </>
  )
}
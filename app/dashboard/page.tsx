import ProtectedRoute from "@/components/auth/protected-route"
import DashboardMejorado from "@/components/dashboard-mejorado"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardMejorado />
    </ProtectedRoute>
  )
}

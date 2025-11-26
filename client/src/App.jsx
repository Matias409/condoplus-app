import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Finance from './pages/Finance'
import Incidents from './pages/Incidents'
import Residents from './pages/Residents'
import Communications from './pages/Communications'
import Voting from './pages/Voting'
import ResidentDashboard from './pages/resident/ResidentDashboard'
import MyPayments from './pages/resident/MyPayments'
import GenerateQR from './pages/resident/GenerateQR'
import ReserveSpaces from './pages/resident/ReserveSpaces'
import MyIncidents from './pages/resident/MyIncidents'
import ResidentCommunications from './pages/resident/Communications'
import ResidentVoting from './pages/resident/ResidentVoting'
import { ProtectedRoute } from './components/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'
import ResidentLayout from './components/layout/ResidentLayout'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="finanzas" element={<Finance />} />
        <Route path="residentes" element={<Residents />} />
        <Route path="incidencias" element={<Incidents />} />
        <Route path="comunicaciones" element={<Communications />} />
        <Route path="votaciones" element={<Voting />} />
      </Route>

      {/* Resident Routes */}
      <Route path="/resident" element={
        <ProtectedRoute requiredRole="resident">
          <ResidentLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<ResidentDashboard />} />
        <Route path="pagos" element={<MyPayments />} />
        <Route path="reservas" element={<ReserveSpaces />} />
        <Route path="qr" element={<GenerateQR />} />
        <Route path="incidencias" element={<MyIncidents />} />
        <Route path="comunicaciones" element={<ResidentCommunications />} />
        <Route path="votaciones" element={<ResidentVoting />} />
        <Route index element={<Navigate to="/resident/dashboard" replace />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App

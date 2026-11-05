import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { CleanPage } from '../pages/CleanPage'
import { ContactPage } from '../pages/ContactPage'
import { EventsPage } from '../pages/EventsPage'
import { FarmsPage } from '../pages/FarmsPage'
import { HomePage } from '../pages/HomePage'
import { LabsPage } from '../pages/LabsPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProtectPage } from '../pages/ProtectPage'
import { TourPage } from '../pages/TourPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="labs" element={<LabsPage />} />
        <Route path="protect" element={<ProtectPage />} />
        <Route path="clean" element={<CleanPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="farms" element={<FarmsPage />} />
        <Route path="agro-polo-tour" element={<TourPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

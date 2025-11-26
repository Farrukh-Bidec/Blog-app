
import Navbar from "../components/Navbar"
import AppSidebar from "../components/AppSidebar"
import { SidebarProvider } from "../components/ui/sidebar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Navbar />
      <main>
        <Outlet />
      <Footer />
      </main>
    </SidebarProvider>
  )
}
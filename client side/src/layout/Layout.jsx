
import Navbar from "../components/Navbar"
import AppSidebar from "../components/AppSidebar"
import { SidebarProvider } from "../components/ui/sidebar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />

        <div className="flex flex-1">
          <AppSidebar />
          <main className="w-full">
            <Outlet />
        <Footer />
          </main>
        </div>

      </div>
    </SidebarProvider>
  )
}
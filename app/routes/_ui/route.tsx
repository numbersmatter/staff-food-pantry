import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from './sidebar';
import { Outlet } from 'react-router';




export default function Route() {
  return (
    <>
      <>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </>
    </>
  )
}
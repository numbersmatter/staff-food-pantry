import { useLoaderData } from "react-router"
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from './sidebar';
import { Outlet } from 'react-router';
import { Route } from "./+types/route";
import { handleAuth } from "./data/handle-auth.server";


export const loader = async (args: Route.LoaderArgs) => {
  const authData = await handleAuth(args);

  return {};
};






export default function LayoutRoute() {
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
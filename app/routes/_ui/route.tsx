import { useLoaderData } from "react-router"
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { AppSidebar } from './sidebar';
import { Outlet } from 'react-router';
import { Route } from "./+types/route";
import { handleAuth } from "./data/handle-auth.server";
import { Separator } from "~/components/ui/separator";


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
            <PageHeader />
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </>
    </>
  )
}

function PageHeader() {

  return (
    <header className="flex h-16 shrink-0 items-center px-4 border-b">
      <SidebarTrigger className=" -ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h3 className="text-lg font-semibold">
        Food Pantry Staff
      </h3>
      <Separator orientation="vertical" className="mr-2 h-4" />
    </header>
  )
}
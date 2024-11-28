import { LoaderFunctionArgs } from "react-router"
import { requireAuth } from "~/lib/auth/user-auth.server"


export const handleAuth = async (args: LoaderFunctionArgs)=>{
   await requireAuth(args)
  return {}
}
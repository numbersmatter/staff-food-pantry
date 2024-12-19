import { requireAuth } from "~/lib/auth/user-auth.server";
import { Route } from "../+types/route";

export const handleAuth = async (args: Route.LoaderArgs) => {
  return await requireAuth(args);
};
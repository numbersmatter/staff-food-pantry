import { checkAuth } from "~/lib/auth/user-auth.server";
import type { Route } from "../+types/route";
import { redirect } from "react-router";

export const handleAuth = async (args: Route.LoaderArgs) => {
  const data = await checkAuth(args);

  // if user is authenticated, redirect to home page
  if (data.authenticated) {
    throw redirect("/");
  }

  return data;
};

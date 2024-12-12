import { LoaderFunctionArgs } from 'react-router';
import { Route } from '../+types/route';
import { requireAuth } from '~/lib/auth/user-auth.server';

export const handleAuth = async (args: Route.LoaderArgs) => {
  return requireAuth(args);
};
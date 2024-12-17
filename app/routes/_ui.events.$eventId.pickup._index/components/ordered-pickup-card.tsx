import { useLoaderData } from "react-router";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/components/ui/card";
import { Route } from "../+types/route";
import { loader } from "../route";
import OrderedPickupList from "./ordered-pickup-list";


export default function OrderedPickupCard() {
  const { reservations, slots } = useLoaderData<typeof loader>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Pickups in Order
        </CardTitle>
        <CardDescription>

        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 sm:px-3">
        <OrderedPickupList />
        <pre>{JSON.stringify(slots, null, 2)}</pre>

      </CardContent>
    </Card>
  )



}
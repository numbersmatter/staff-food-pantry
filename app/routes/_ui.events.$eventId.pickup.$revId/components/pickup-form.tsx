import { useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { loader } from "../route";
import { ConfirmPickup } from "./confirm-pickup";




export default function PickupForm() {
  const { reservation } = useLoaderData<typeof loader>();

  return (
    <Card className="flex flex-col flex-1 pb-4"
    >
      <CardContent
        className="flex-1 grid grid-cols-1 py-8 place-content-center"
      >
        <h3
          className="m-auto inset-0 text-5xl text-sky-600 font-bold"
        >
          {reservation.confirm}
        </h3>
      </CardContent>
      <CardFooter
        className="grid grid-cols-1 gap-4"
      >
        <ConfirmPickup />
        <Button
          variant={"secondary"}
          className=""
        >
          Cancel
        </Button>

      </CardFooter>
    </Card>
  )
}
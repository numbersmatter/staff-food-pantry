import { Form } from "react-router"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"

export function ConfirmPickup() {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          Confirm Pickup
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm Box Pickedup
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will mark the box as picked up.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form method="post" >
            <Button name="intent" value="confirm" type="submit" variant={"outline"}>
              Confirm Pickup
            </Button>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

import { useLoaderData } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";
import ApplicationDetails from "./application-details";
import { UpdateApplicationDialog } from "./update-application-dialog";


export default function ApplicationCard() {
  const { application } = useLoaderData<typeof loader>();
  const contact = application.primaryContact;
  // const appliedData = new Date(application.createdDate).toLocaleDateString();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {`${contact.fname} ${contact.lname}`}
        </CardTitle>
        <CardDescription>
          Applied: {new Date(application.createdDate).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ApplicationDetails />
      </CardContent>
      <CardFooter>
        <UpdateApplicationDialog />
      </CardFooter>
    </Card>
  )
}
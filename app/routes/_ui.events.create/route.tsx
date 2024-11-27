import { ActionFunctionArgs, Form, LoaderFunctionArgs, useActionData, useLoaderData } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { getPageData } from "./data/data-fetchers.server";
import { useState } from "react";
import { useForm } from "@conform-to/react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { mutations } from "./data/mutations.server";




export async function loader(args: LoaderFunctionArgs) {

  const pageData = await getPageData();

  return { ...pageData };
}

export async function action(args: ActionFunctionArgs) {
  const formData = await args.request.formData();
  return await mutations.makeEvent({ formData });
}




export default function CreateEvent() {
  const lastResult = useActionData<typeof action>();
  const { semesterInfo, semesterId } = useLoaderData<typeof loader>();
  const [eventType, setEventType] = useState("pickup");
  const [form, fields] = useForm({
    // onValidate({ formData }) {
    //   return parseWithZod(formData, { schema: CreateEventSchema });
    // }
  });


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Create Event
        </CardTitle>
      </CardHeader>
      <Form method="post" id={form.id} onSubmit={form.onSubmit} noValidate>
        <CardContent>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Name
              </Label>
              <Input
                id={fields.name.id}
                key={fields.name.key}
                name={fields.name.name}
                // defaultValue={fields.name.initialValue}
                className="col-span-3 max-w-sm"
              />
              <div className="col-span-3 col-start-2">
                {fields.name.errors &&
                  fields.name.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Event Type
              </Label>
              <input
                type="hidden"
                name={fields.type.name}
                id={fields.type.id}
                value={eventType}
                readOnly
              />
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      Select a Type
                    </SelectLabel>
                    <SelectItem value={"pickup"}>
                      Pickup
                    </SelectItem>
                    <SelectItem value={"drive-thru"}>
                      Drive Thru
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="col-span-3 col-start-2">
                {fields.type.errors &&
                  fields.type.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Semester
              </Label>
              <input
                type="hidden"
                name={fields.semesterId.name}
                id={fields.semesterId.id}
                value={semesterId}
                readOnly
              />
              <Select value={semesterId}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      Select a Semester
                    </SelectLabel>
                    <SelectItem value={semesterId}>
                      {semesterInfo.semesterName}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="col-span-3 col-start-2">
                {fields.semesterId.errors &&
                  fields.semesterId.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Event Date
              </Label>
              <Input
                id={fields.eventDate.id}
                key={fields.eventDate.key}
                name={fields.eventDate.name}
                // defaultValue={fields.eventDate.initialValue}
                className="col-span-3 max-w-sm"
                type="datetime-local"
              />
              <div className="col-span-3 col-start-2">
                {fields.eventDate.errors &&
                  fields.eventDate.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="">
            Create Event
          </Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
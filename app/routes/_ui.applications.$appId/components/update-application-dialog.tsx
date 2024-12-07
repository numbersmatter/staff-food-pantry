import {
  Form,
  useActionData,
  useLoaderData
} from "react-router";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { action, loader } from "../route";
import { getFormProps, useForm } from "@conform-to/react";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";

import { ChangeApplicationStatusSchema } from "../data/schemas";



const requestSchema = z.object({
  time: z.string(),
});

export function UpdateApplicationDialog({

}: {
  }) {
  const { application } = useLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);
  const lastResult = useActionData<typeof action>();
  const [newStatus, setNewStatus] = useState(application.status);
  // const userInfo = useUser();

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ChangeApplicationStatusSchema });
    }
  });


  const applicationStatus = application.status;




  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant="default">
          {applicationStatus === "pending" ? "Process" : "Change"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen max-w-lg mx-0">
        <DialogHeader>
          <DialogTitle>
            Change Status
          </DialogTitle>
          <DialogDescription>
            Change the status of this application.
          </DialogDescription>
        </DialogHeader>
        <Form method="post" {...getFormProps(form)}>
          <div className="grid gap-4 py-4">
            <Label htmlFor={fields.newStatus.id}>
              New Status
            </Label>
            <input
              hidden
              id={fields.newStatus.id} name={fields.newStatus.name}
              value={newStatus}
              readOnly
            />
            <input type="hidden" name="applicationId" value={application.id} />
            {/* @ts-ignore issue with string enums */}
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Select a status
                  </SelectLabel>
                  <SelectItem value={"pending"}>
                    Pending
                  </SelectItem>
                  <SelectItem value={"accepted"}>
                    Accepted
                  </SelectItem>
                  <SelectItem value={"declined"}>
                    Declined
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <input type="hidden" name="semesterId" value={application.semesterId} />
            <Button variant={"default"} name={"intent"} value={"status-update"} type="submit">
              Update
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
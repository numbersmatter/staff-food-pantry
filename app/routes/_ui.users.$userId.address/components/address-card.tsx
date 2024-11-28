import { Form, useActionData, useLoaderData, useNavigation, useRouteLoaderData } from "react-router"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { action, loader } from "../route"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { AddressSchema } from "../data/schemas"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { ValidationMessage } from "~/components/standardized/validation-message"
import { loader as userLoader } from "~/routes/_ui.users.$userId/route";



export function AddressCard() {
  const { language, address, } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  // @ts-expect-error  this route is loaded
  const { email } = useRouteLoaderData<typeof userLoader>("routes/_ui.users.$userId");

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult: actionData,

    // Reuse the validation logic on the client
    // onValidate({ formData }) {
    //   return parseWithZod(formData, { schema: AddressSchema });
    // },
    defaultValue: {
      street: address.street,
      unit: address.unit,
      city: address.city,
      state: "NC",
      zip: address.zip,
      email: email,
    },

  })

  const english = {
    button: "Update",
    title: "Address",
    description: "Update your address.",
    street: "Street",
    unit: "Unit",
    city: "City",
    state: "State",
    zip: "Zip",
    submit: "Submit",
  }

  const spanish = {
    button: "Actualizar",
    title: "Dirección",
    description: "Actualiza tu dirección.",
    street: "Calle",
    unit: "Unidad",
    city: "Ciudad",
    state: "Estado",
    zip: "Código Postal",
    submit: "Enviar",
  }



  const lang = language === "es" ? spanish : english
  // const lang = spanish

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {lang.title}
        </CardTitle>
        <CardDescription>
          {lang.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" {...getFormProps(form)} >

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.street.id} className="text-right">
                {lang.street}
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.street, { type: "text" })}
              />
              {
                fields.street.errors &&
                <div className=" col-start-2 col-span-3">
                  <ValidationMessage error={fields.street.errors} isSubmitting={isSubmitting} />
                </div>
              }
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.unit.id} className="text-right">
                {lang.unit}
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.unit, { type: "text" })}
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.unit.errors}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.city.id} className="text-right">
                {lang.city}
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.city, { type: "text" })}
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.city.errors}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.state.id} className="text-right">
                {lang.state}
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.state, { type: "text" })}
                readOnly
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.state.errors}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.zip.id} className="text-right">
                {lang.zip}
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.zip, { type: "text" })}
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.zip.errors}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.email.id} className="text-right">
                Email
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.email, { type: "email" })}
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.email.errors}
              </div>
            </div>
            <div>
              {/* <input name="email" value={email} /> */}
              <pre>
                {JSON.stringify(email, null, 2)}
              </pre>
            </div>
          </div>
          <Button name="type" value="updateAddress" type="submit">
            {lang.button}
          </Button>
        </Form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}


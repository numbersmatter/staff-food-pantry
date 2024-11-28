import {
  Form,
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "react-router"
import { EllipsisVerticalIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import { loader } from "../route"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { useState } from "react"
import { useForm, getFormProps, getInputProps } from "@conform-to/react";




type Student = {
  fname: string
  lname: string
  school: "tps" | "lde" | "tms" | "ths"
  id: string
}

type Lang = {
  add: string
  edit: string
  remove: string
}



export function StudentsCard() {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const english = {
    title: "Students",
    description: "Enter Students",
    button: "Continue",
    studentRequired: "This program requires at least one student to be enrolled in Thomasville City Schools. Please add a student.",
  }

  const spanish = {
    title: "Estudiantes",
    description: "Ingrese estudiantes",
    button: "Continuar",
    studentRequired: "Este programa requiere al menos un estudiante inscripto en escuelas de Thomasville. Por favor agregue un estudiante.",
  }

  const lang = loaderData.language === "es" ? spanish : english

  const noStudents = loaderData.students.length < 1

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
        {
          noStudents && <p className="text-sm text-red-500">
            {lang.studentRequired}
          </p>}
        <ContentStudents />
        <CreateStudentForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-4 md:flex-row md:gap-8 ">
        <Button
          variant="default"
          className="w-full md:w-auto"
          onClick={() => navigate("..")}
        >
          Back
        </Button>
      </CardFooter>
    </Card>

  )
}

function ContentStudents() {
  const { students, language } = useLoaderData<typeof loader>()


  const english = {
    add: "Add Student",
    edit: "Edit",
    remove: "Remove",
  }

  const spanish = {
    add: "Agregar estudiante",
    edit: "Editar",
    remove: "Eliminar",
  }

  const lang = language === "es" ? spanish : english


  return (
    <ul className="divide-y divide-gray-100">
      {students.map((student: Student) => (
        <StudentRowCard key={student.id} student={student} lang={lang} />
      )
      )}
    </ul>
  )
}




function StudentRowCard({ student, lang }: {
  student: Student,
  lang: Lang
}) {
  const fetcher = useFetcher();

  const handleRemove = async () => {
    return fetcher.submit({ intent: "removeStudent", studentId: student.id }, { method: "post" });
  }


  return <li key={student.id} className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <div className="h-12 w-12 pt-3 flex place-content-center flex-none rounded-full bg-gray-50">
        {student.fname.charAt(0)}
      </div>
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {student.fname} {student.lname}
        </p>
        <p className="mt-1 flex text-xs leading-5 text-gray-500">

        </p>
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-x-6">
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{student.school}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          School: {student.school}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
          <span className="sr-only">
            {lang.edit}
          </span>
          <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
        >
          <DropdownMenuLabel>

          </DropdownMenuLabel>
          {/* <DropdownMenuItem>{lang.edit}</DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleRemove}>{lang.remove}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </li>
}


function CreateStudentForm() {
  const [school, setSchool] = useState("");
  const [form, fields] = useForm({
    defaultValue: {
      fname: "",
      lname: "",
      school: "",
    },
  })

  return (
    <Form method="post"
      {...getFormProps(form)}
      className="border mt-3"
    >

      <div className="grid gap-4 py-4">
        <h2 className="text-lg font-semibold text-center">Add Student Form</h2>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={fields.fname.id} className="text-right">
            First Name
          </Label>
          <Input
            defaultValue=""
            className="col-span-3"
            {...getInputProps(fields.fname, { type: "text" })}
          />
          <div className="text-red-500 col-start-2 col-span-3">
            {fields.fname.errors}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={fields.lname.id} className="text-right">
            Last Name
          </Label>
          <Input
            defaultValue=""
            className="col-span-3"
            {...getInputProps(fields.lname, { type: "text" })}
          />
          <div className="text-red-500 col-start-2 col-span-3">
            {fields.lname.errors}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={"school"} className="text-right">
            School
          </Label>
          <div className="col-span-3">
            <RadioGroup defaultValue="comfortable" value={school} onValueChange={setSchool}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tps" id="tps" />
                <Label htmlFor="tps">Thomasville Primary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lde" id="lde" />
                <Label htmlFor="lde">Liberty Drive Elementary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tms" id="tms" />
                <Label htmlFor="tms">Thomasville Middle</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ths" id="ths" />
                <Label htmlFor="tms">Thomasville High</Label>
              </div>
            </RadioGroup>
            <input type="hidden" name="school" value={school} readOnly />
          </div>
          <div className="text-red-500 col-span-3 col-start-2">
            {fields.school.errors}
          </div>
        </div>

      </div>
      <div className="flex flex-row justify-center py-4" >
        <Button name="intent" value="addStudent" type="submit">
          Add Student
        </Button>
      </div>
    </Form>
  )
}

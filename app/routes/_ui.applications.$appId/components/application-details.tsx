import { School2Icon } from "lucide-react";
import { loader } from "../route";
import { useLoaderData } from "react-router";

export default function ApplicationDetails() {
  const { application } = useLoaderData<typeof loader>();
  const contact = application.primaryContact;
  const numberStudents = application.students.length;
  const school = application.students[0].school;
  const schools = {
    "lde": "Liberty Drive Elementary",
    "tms": "Thomasville Middle School",
    "tps": "Thomasville Primary School",
    "ths": "Thomasville High School",
  }

  return (
    <div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Number of students
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {numberStudents}

            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {contact.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {contact.phone}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-4 py-2 border-b-2  border sm:grid-cols-2">
            {application.minors.map((student) => (
              <div
                key={student.id}
                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
              >
                <div className="flex-shrink-0">
                  <School2Icon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="">
                    <p className="text-sm font-medium text-gray-900">
                      {student.fname} {student.lname}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      Minor
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {application.students.map((student) => (
              <div
                key={student.id}
                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
              >
                <div className="flex-shrink-0">
                  <School2Icon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="">
                    <p className="text-sm font-medium text-gray-900">
                      {student.fname} {student.lname}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {schools[student.school]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>




        </dl>
      </div>
    </div>
  )
}

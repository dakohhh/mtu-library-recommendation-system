"ise client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Student } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

//  API REQUESTS


type PropsType = { student: Student };

export default function DeleteStudentAction({ student }: PropsType) {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"])

  async function deleteStudent(id: string) {
    const result = window.confirm("Are you sure you want to proceed?");
    if (result === true) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/student/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        if (!response.ok) {
          toast.error("Something went error. Please try again later");
          throw new Error("Failed to fetch data");
        }
        toast.success("Student delete");
        window.location.reload();
        return;
      } catch (error) {
        toast.error("Something went error. Please try again later");
        console.error("DELETING ERROR!", error);
      }
    }
  }

  function editStudent(studentData: Student) {
    localStorage.removeItem("student");
    localStorage.setItem("student", JSON.stringify(studentData));
    router.push("/dashboard/student-form");
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* <DropdownMenuItem onClick={() => editStudent(student)}>
            Edit Student
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => deleteStudent(student.id)}>
            <span className="text-red-500">Delete Student</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Toaster />
    </>
  );
}

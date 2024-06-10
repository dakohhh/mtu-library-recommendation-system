import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import Loading from "@/components/ui/loading";
import { useCookies } from "react-cookie";

//  API REQUESTS


export default function DeleteAllStudents() {
  const [requesting, setRequesting] = useState(false);
  const [cookies, setCookie] = useCookies(["token"])

  async function deleteStudents() {
    const result = window.confirm("Are you sure you want to proceed?");
    if (result === true) {
      setRequesting(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/student/`,
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
      } finally {
        setRequesting(false);
      }
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={() => deleteStudents()} variant={"destructive"}>
        Delete All Students
      </Button>
      {requesting && <Loading />}
      <Toaster />
    </div>
  );
}

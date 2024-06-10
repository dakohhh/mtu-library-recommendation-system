"use client";

import { useState, useEffect } from "react";
import { columns } from "./columns";
import { StudentsDataTable } from "./students-data-table";
import Loading from "@/components/ui/loading";
import { Student, Books } from "@/lib/types";
import { useCookies } from "react-cookie";

function fetchData(token: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/book/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((responseData) => {
      if (!responseData.status) {
        throw new Error("Failed to fetch students");
      }
      return responseData.data.books.map((book: Books) => ({
        ...book,
      }));
    })
    .catch((error) => {
      console.error("FETCHING ERROR!", error);
      return [];
    });
}

export default function Page() {
  const [data, setData] = useState<Books[]>([]);
  const [requesting, setRequesting] = useState(false);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const token= cookies.token;
    if (token) {
      setRequesting(true);
      fetchData(token)
        .then((students) => {
          setData(students);
        })
        .finally(() => setRequesting(false));
    }
  }, []);

  return (
    <div className="container mx-auto py-10">
      {requesting ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loading />
        </div>
      ) : (
        <StudentsDataTable columns={columns} data={data} footerBtn={true} />
      )}
    </div>
  );
}

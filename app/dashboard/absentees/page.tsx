"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AcademicSession, AcademicSessionAPI, Books, Student } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { absenteesColumns } from "../absentees-columns";
import { StudentsDataTable } from "../students-data-table";
import { useCookies } from 'react-cookie';
import Select from "react-select";


const formSchema = z.object({
  language_code: z.string({
    required_error: "Please provide a Langauge code",
  }),
  genres: z.array(z.string()),
});

export default function AbsenteesPage() {
  const router = useRouter();

  //  FETCH DATA FOR THE FORM
  //  https://mtu-chapel-attendance-system.onrender.com/api/academic_session/
  const [academics, setAcademics] = useState<AcademicSession[]>([]);
  const [absentees, setAbsentees] = useState<Books[]>([]);
  const [requesting, setRequesting] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);


  const genreOptions = [
    { value: "Fiction", label: "Fiction" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Science", label: "Science" },

    { value: '12th Century', label: '12th Century' },
  { value: '13th Century', label: '13th Century' },
  { value: '14th Century', label: '14th Century' },
  { value: '15th Century', label: '15th Century' },
  { value: '16th Century', label: '16th Century' },
  { value: '17th Century', label: '17th Century' },
  { value: '18th Century', label: '18th Century' },
  { value: '1961-1975', label: '1961-1975' },
  { value: '19th Century', label: '19th Century' },
  { value: '1st Grade', label: '1st Grade' },
  { value: '20th Century', label: '20th Century' },
  { value: '21st Century', label: '21st Century' },
  { value: '2nd Grade', label: '2nd Grade' },
  { value: '40k', label: '40k' },
  { value: 'AUTOBIOGRAPHY', label: 'AUTOBIOGRAPHY' },
  { value: 'Abuse', label: 'Abuse' },
  { value: 'Academia', label: 'Academia' },
  { value: 'Academic', label: 'Academic' },
  { value: 'Academics', label: 'Academics' },
  { value: 'Accounting', label: 'Accounting' },
  { value: 'Action', label: 'Action' },
  { value: 'Activism', label: 'Activism' },
  { value: 'Activities', label: 'Activities' },
  { value: 'Adaptations', label: 'Adaptations' },
  { value: 'Adhd', label: 'Adhd' },
  { value: 'Adolescence', label: 'Adolescence' },
  { value: 'Adoption', label: 'Adoption' },
  { value: 'Adult', label: 'Adult' },
  { value: 'Adult Fiction', label: 'Adult Fiction' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Africa', label: 'Africa' },
  { value: 'African American', label: 'African American' },
  {
    value: 'African American Literature',
    label: 'African American Literature'
  },
  {
    value: 'African American Romance',
    label: 'African American Romance'
  },
  { value: 'African Literature', label: 'African Literature' },
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Alchemy', label: 'Alchemy' },
  { value: 'Alcohol', label: 'Alcohol' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'Algorithms', label: 'Algorithms' },
  { value: 'Aliens', label: 'Aliens' },
  { value: 'Alternate History', label: 'Alternate History' },
  { value: 'Alternative Medicine', label: 'Alternative Medicine' },
  { value: 'Amateur Sleuth', label: 'Amateur Sleuth' },
  { value: 'Amazon', label: 'Amazon' },
  { value: 'American', label: 'American' },
  { value: 'American Civil War', label: 'American Civil War' },
  { value: 'American Fiction', label: 'American Fiction' },
  { value: 'American History', label: 'American History' },
  { value: 'American Revolution', label: 'American Revolution' },
  {
    value: 'American Revolutionary War',
    label: 'American Revolutionary War'
  },
  { value: 'American fiction', label: 'American fiction' },
  { value: 'American literature', label: 'American literature' },
  { value: 'Americana', label: 'Americana' },
  { value: 'Amish', label: 'Amish' },
  { value: 'Anarchism', label: 'Anarchism' },
  { value: 'Ancient', label: 'Ancient' },
  { value: 'Ancient History', label: 'Ancient History' },
  { value: 'Angels', label: 'Angels' },
  { value: 'Anglo Saxon', label: 'Anglo Saxon' },
  { value: 'Animal Fiction', label: 'Animal Fiction' },
  { value: 'Animals', label: 'Animals' },
  { value: 'Anime', label: 'Anime' },
  { value: 'Anthologies', label: 'Anthologies' },
  { value: 'Anthropology', label: 'Anthropology' },
  { value: 'Anthropomorphic', label: 'Anthropomorphic' },
  { value: 'Anti Racist', label: 'Anti Racist' },
  { value: 'Antiques', label: 'Antiques' },
  { value: 'Apocalyptic', label: 'Apocalyptic' },
  { value: 'Apple', label: 'Apple' },
  { value: 'Archaeology', label: 'Archaeology' },
  { value: 'Architecture', label: 'Architecture' },
  { value: 'Art', label: 'Art' },
  { value: 'Art Design', label: 'Art Design' },
  { value: 'Art History', label: 'Art History' },
  { value: 'Art and Photography', label: 'Art and Photography' }
    // Add more genres as needed
  ];

  const langaugeCodeOptions = [
    { value: "eng", label: "eng" },
    { value: "en-US", label: "en-US" },
    { value: "fre", label: "fre" },
    { value: "spa", label: "spa" },
    { value: "en-GB", label: "en-GB" },
    { value: "mul", label: "mul" },
    { value: "grc", label: "grc" },
    { value: "enm", label: "enm" },
    { value: "en-CA", label: "en-CA" },
    { value: "ger", label: "ger" },
    { value: "jpn", label: "jpn" },
    { value: "ara", label: "ara" },
    { value: "nl", label: "nl" },
    { value: "zho", label: "zho" },
    { value: "lat", label: "lat" },
    { value: "por", label: "por" },
    { value: "ita", label: "ita" },
    { value: "rus", label: "rus" },
    { value: "msa", label: "msa" },
    { value: "glg", label: "glg" },
    { value: "swe", label: "swe" },
    { value: "nor", label: "nor" },
    { value: "tur", label: "tur" },
    { value: "gla", label: "gla" },
    { value: "ale", label: "ale" },
  ];


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language_code: "",
      genres: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setSubmiting(true);
    console.log(data);

    interface GetBookRecommendation {
      genres: string[]
      language_code:string

    }

    const bookRecommendation:GetBookRecommendation = {
      genres: data.genres,
      language_code: data.language_code
    }

    try {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/recommend/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(bookRecommendation),
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Creating new student failed");
          }
          else{
            const responseData = await response.json();

            if (responseData?.data.recommendations) {
              setAbsentees(responseData.data.recommendations);
            }

          }
          
        })
        .catch((err) => {
          console.error("Login failed", err);
          toast.error("Something went wrong. Try it again with the right data");
          throw new Error("Login error");
        });
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setSubmiting(false);
    }
  }

  useEffect(() => {
    setRequesting(true);
  }, []);

  return (
    <div>
      <h2>Recommendation</h2>
      <div className="mx-auto my-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex gap-4"
          >
            <div className="flex gap-4 items-end">

              <FormField
                control={form.control}
                name="language_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language code</FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="language_code"
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            options={langaugeCodeOptions}
                            value={langaugeCodeOptions.find(option => option.value === value)}
                            onChange={(selected) => {
                              onChange(selected ? selected.value : "");
                            }}
                            ref={ref}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="genres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genres</FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="genres"
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            isMulti
                            options={genreOptions}
                            value={genreOptions.filter((option) =>
                              value.includes(option.value)
                            )}
                            onChange={(selected) => {
                              onChange(selected.map((option) => option.value));
                            }}
                            ref={ref}
                          />
                        )}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3">
                <Button type="submit" disabled={submiting}>
                  Recommend Books
                </Button>
                {submiting && <Loading />}
              </div>
            </div>
          </form>
        </Form>
      </div>

      <div className="mx-auto my-10">
        {absentees.length > 0 ? (
          <StudentsDataTable
            columns={absenteesColumns}
            data={absentees}
            printTable={true}
          />
        ) : (
          <p className="my-10 text-center">
            No Recommendations made yet.
          </p>
        )}
      </div>
    </div>
  );
}

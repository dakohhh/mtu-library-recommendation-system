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
import { DEPARTMENTS } from "@/lib/enums";
import { AcademicSession, AcademicSessionAPI } from "@/lib/types";
import { getSubjectOptions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useCookies } from "react-cookie";
import Select from "react-select";

const formSchema = z.object({
  title: z.string().min(3),
  author: z.string().min(3),
  langauge_code: z.string(),
  genres: z.array(z.string()),
});


export default function StudentFormPage() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const [requesting, setRequesting] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      langauge_code: "",
      genres: [],
    },
  });


  function onSubmit(values: z.infer<typeof formSchema>) {
    let newBook = values;
    console.log(newBook)
    setSubmiting(true);

    try {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/book/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(newBook),
      })
        .then(async (response) => {
          if (!response.ok) {            
            const data = await response.json();
            console.log(data)
            if (data?.message) throw new Error(data.message);
            throw new Error("Creating new student failed");
          }
          else{
            const data = await response.json();
            console.log(data)
            toast.success("Book created");
            router.push("/dashboard"); // reload page instead

          }
        })
        .catch((err:Error) => {
          toast.error(err.message);
        });
    } catch (err) {
      toast.error("Something went wrong. Try it again with the right data");
      throw new Error("Login error");

    } finally {
      setSubmiting(false);
    }
  }

  useEffect(() => {
    setRequesting(true)
  }, []);

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

  return (
    <div>
      <h2>Book Form</h2>

      <div className="hh w-[80%] mx-auto my-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title </FormLabel>
                  <FormControl>
                    <Input placeholder="Harry Potter" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="JK Rowling" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="langauge_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Langauge Code</FormLabel>
                  <FormControl>
                    <Input placeholder="eng" {...field} />
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
                Submit
              </Button>
              {submiting && <Loading />}
            </div>
          </form>
        </Form>
      </div>
      <Toaster />
    </div>
  );
}

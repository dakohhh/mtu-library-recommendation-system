"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import cookies, { useCookies } from 'react-cookie';

const formSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(1, { message: "This field has to be filled." }),
});

export default function LoginPage() {
  const router = useRouter();

  const [cookie, setCookie] = useCookies(["token"])

  const [resquesting, setRequesting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setRequesting(true);
    try {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Login failed");
          }

          const data:any = await response.json();
		  
          sessionStorage.setItem("token", JSON.stringify(data.data.token));
		//   Using cookies also
		    setCookie("token", data.data.token)

          router.push("/dashboard");
        })
        .catch((err) => {
          console.error("Login failed 1", err);
          toast.error("Something went wrong. Try it again with the right data");

          throw new Error("Login error");
        });
    } catch (err) {
      throw new Error("Login error");
    } finally {
      setRequesting(false);
    }
  }

  return (
    <>
      <CircleUserRoundIcon size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="user@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the email address you used to sign up with
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the password you used to sign up with
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Login</Button>
              {resquesting && <Loading />}
            </form>
          </Form>
        </CardContent>

        {/* <CardFooter className="w-full gap-4 justify-between">
          <small>Don't have an account?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </CardFooter> */}
      </Card>
      <Toaster />
    </>
  );
}

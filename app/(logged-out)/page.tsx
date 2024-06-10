import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <h1 className="flex flex-col items-center justify-center gap-2">
        <Logo size={200} />
        <span className=" text-center">MTU Library &apos;s Recommendation System</span>
      </h1>
      <p>Recommeding Books for students.</p>
      <div className="flex items-center gap-3">
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
        {/* <small>or</small>
        <Button asChild variant={"outline"}>
          <Link href="/sign-up">Sign up</Link>
        </Button> */}
      </div>
    </>
  );
}

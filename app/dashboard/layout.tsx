"use client";

import { ReactNode } from "react";
import MainMenu from "./components/main-menu";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [cookies] = useCookies(["token"]);

  if (!cookies.token) {
    router.push("/");
    return;
  }

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <MainMenu />
      <div className="overflow-auto py-2 px-4">
        <h1 className="pb-4">Welcome back</h1>
        {children}
      </div>
    </div>
  );
}

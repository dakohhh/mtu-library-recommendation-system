import LightDarkToggle from "@/components/ui/light-dark-toggle";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function LoggedOutLayout({ children }: Props) {
  return (
    <>
      <div className=" flex items-center justify-center flex-col min-h-screen p-24 gap-4">
        {children}
      </div>

      <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2 " />
    </>
  );
}

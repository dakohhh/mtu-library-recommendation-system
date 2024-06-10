"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
};

export default function MenuItem({ children, href }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li>
      <Link
        className={cn(
          "block hover:bg-white dark:hover:bg-zinc-700 rounded-md text-muted-foreground hover:text-foreground p-2",
          isActive &&
            "bg-primary hover:bg-primary dark:hover:bg-primary dark:text-foreground hover:text-primary-foreground text-primary-foreground"
        )}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

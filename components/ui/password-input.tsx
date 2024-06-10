"use client";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { Input } from "./input";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPasswd, setShowPasswd] = React.useState(false);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          className={cn("pr-10", className)}
          type={showPasswd ? "text" : "password"}
        />
        <span
          className=" absolute top-[7px] right-3 cursor-pointer select-none"
          onClick={() => setShowPasswd(!showPasswd)}
        >
          {showPasswd ? <EyeIcon /> : <EyeOffIcon />}
        </span>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

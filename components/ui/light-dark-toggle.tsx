"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type Props = {
  className?: string;
};

export default function LightDarkToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  function setMode() {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={className} onClick={setMode}>
          {isDarkMode ? <MoonIcon /> : <SunIcon />}
        </TooltipTrigger>

        <TooltipContent>
          {isDarkMode ? "Enable light mode" : "Enable dark mode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

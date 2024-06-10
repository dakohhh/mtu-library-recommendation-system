import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SubjectOption } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectOptions = (enumObj: any): SubjectOption[] => {
  const options: SubjectOption[] = [];
  for (const [key, value] of Object.entries(enumObj)) {
    if (!isNaN(Number(key))) {
      // Check if key is a number
      options.push({ id: Number(key), label: value as string });
    }
  }
  return options;
};

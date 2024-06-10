"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LightDarkToggle from "@/components/ui/light-dark-toggle";
import { useRouter } from "next/navigation";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import { useCookies } from "react-cookie";

const DEFAULT_AVATAR_URL =
  "https://static.vecteezy.com/system/resources/thumbnails/020/911/746/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png";

export default function MainMenu() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  function logout() {

    removeCookie("token", { path: '/' });
    removeCookie("token", { path: '/dashboard' });
    router.replace("/");
  }

  return (
    <nav className="bg-muted overflow-auto p-4 flex flex-col">
      <header className="border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>

      <ul className="flex flex-col py-4 gap-2 grow">
        <MenuItem href="/dashboard">Dashboard</MenuItem>
        <MenuItem href="/dashboard/student-form">Add Book</MenuItem>
        <MenuItem href="/dashboard/absentees">Reommend Books</MenuItem>
      </ul>

      <footer className="flex gap-2 items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="bg-violet-400 dark:bg-primary p-[6px]">
            <AvatarImage src={DEFAULT_AVATAR_URL} />
            <AvatarFallback>[CN]</AvatarFallback>
          </Avatar>
        </div>
        <div
          onClick={logout}
          className="mr-auto cursor-pointer hover:text-primary"
        >
          Logout
        </div>
        <LightDarkToggle />
      </footer>
    </nav>
  );
}

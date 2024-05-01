import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  MenuIcon,
  Package2Icon,
  SearchIcon,
  UserCircleIcon,
} from "lucide-react";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CusNavShowAdmin from "./CusNavShowAdmin";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

export default async function CusNavbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="/"
          >
            <h1 className="text-xl font-bold flex items-center gap-x-2">
              <Package2Icon className="h-6 w-6" />
              Exclusive
            </h1>
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            className="text-foreground transition-colors hover:text-foreground"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-foreground transition-colors hover:text-foreground"
            href="/orders"
          >
            Orders
          </Link>
          <Link
            className="text-foreground transition-colors hover:text-foreground"
            href="/products"
          >
            Products
          </Link>
          <Link
            className="text-foreground transition-colors hover:text-foreground"
            href="/About"
          >
            About
          </Link>
          <CusNavShowAdmin />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              size="icon"
              variant="outline"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className="flex items-center gap-2 text-lg font-semibold"
                href="/"
              >
                <h1 className="text-xl font-bold flex items-center gap-x-2">
                  <Package2Icon className="h-6 w-6" />
                  Exclusive
                </h1>
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link className="hover:text-foreground" href="/">
                Home
              </Link>
              <Link
                className="text-foreground hover:text-foreground"
                href="/orders"
              >
                Orders
              </Link>
              <Link
                className="text-foreground hover:text-foreground"
                href="/products"
              >
                Products
              </Link>
              <CusNavShowAdmin />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="secondary">
                {user?.picture ? (
                  <Image
                    alt="User avatar"
                    className="rounded-full"
                    height={24}
                    src={user.picture}
                    width={24}
                  />
                ) : (
                  <UserCircleIcon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <ModeToggle />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutLink>Logout</LogoutLink>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <LoginLink>Login</LoginLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RegisterLink>Signup</RegisterLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <ModeToggle />
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}

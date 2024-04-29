import AdCustomersActions from "@/components/admin/AdCustomersActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileEditIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function UsersData() {
  noStore();
  const users = await db.user.findMany({
    select: {
      id: true,
      firstName: true,
      email: true,
      imageUrl: true,
      _count: {
        select: { orders: true },
      },
      orders: {
        select: {
          pricePaid: true,
        },
      },
    },
    orderBy: { firstName: "asc" },
  });
  return users;
}

export default async function CustomersPage() {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const requiredPermission = await getPermission("admin-pages");
  if (!requiredPermission?.isGranted) {
    redirect("/");
  }
  
  const users = await UsersData();

  return (
    <main className="flex-1 overflow-auto p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">All Customers</h2>
        <Link
          className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/admin/customers/new"
        >
          <PlusIcon className="h-4 w-4" />
          Add Customer
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage alt="Avatar" src={user.imageUrl as string} />
                    <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.firstName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className="flex h-6 w-6 items-center justify-center rounded-full">
                    {user._count.orders}
                  </Badge>
                </TableCell>
                <TableCell>
                  $
                  {user.orders
                    .reduce((total, order) => total + order.pricePaid, 0)
                    .toFixed(2)}
                </TableCell>{" "}
                <TableCell>
                  <AdCustomersActions
                    disabled={user._count.orders > 0}
                    id={user.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

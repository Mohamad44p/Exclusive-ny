import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, MoreVertical, XCircle } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";

export default async function OrdersPageAd() {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const requiredPermission = await getPermission("admin-pages");
  if (!requiredPermission?.isGranted) {
    redirect("/");
  }
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>
      <OrdersTable />
    </>
  );
}

async function OrdersTable() {
  noStore();
  const orders = await db.order.findMany({
    select: {
      id: true,
      pricePaid: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
        },
      },
      product: {
        select: {
          name: true,
        },
      },
    },
  });

  if (orders.length === 0) {
    return <div className="mt-12 font-bold text-3xl">No products found</div>;
  }
  return (
    <Table className="mt-11">
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Customer Email</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Price Paid</TableHead>
          <TableHead>order createdAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{order.user.email}</TableCell>
            <TableCell>{order.user.firstName}</TableCell>
            <TableCell>${order.pricePaid}</TableCell>
            <TableCell>{order.createdAt.toString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

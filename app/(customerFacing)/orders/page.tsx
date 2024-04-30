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
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getOrders() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const orders = await db.order.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      product: {
        select: {
          name: true,
        },
      },
      pricePaid: true,
      createdAt: true,
      id: true,
    },
  });
  return orders;
}

export default async function OrderPageCus() {
  const orders = await getOrders();
  if (!orders) {
    return (
      <>
        <h1 className="text-3xl font-bold">Orders</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Order ID</TableHeader>
              <TableHeader>Price Paid</TableHeader>
              <TableHeader>Created At</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <h1>There is No Order Found</h1>
            <Button variant={"default"} asChild>
              <Link href="/products">Go to Products</Link>
            </Button>
          </TableBody>
        </Table>
      </>
    );
  }
  return (
    <>
      <h1 className="text-3xl font-bold">Orders</h1>
      <Table className="mt-11">
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price Paid</TableHead>
            <TableHead>order createdAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>${order.pricePaid}</TableCell>
              <TableCell>{order.createdAt.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

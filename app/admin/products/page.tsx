import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "@/components/admin/ProductActions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { CheckCircle, MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default async function AdminProductPage() {
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
        <h1 className="text-3xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  noStore();
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      isAvailableForPurchase: true,
      _count: {
        select: { orders: true },
      },
    },
    orderBy: { name: "asc" },
  });

  if (products.length === 0) {
    return <div className="mt-12 font-bold text-3xl">No products found</div>;
  }

  return (
    <Table className="mt-11">
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle color="green" />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle color="red" />
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product._count.orders}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <ActiveToggleDropdownItem
                    id={product.id}
                    isAvailableForPurchase={product.isAvailableForPurchase}
                  />
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem
                    id={product.id}
                    disabled={product._count.orders > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

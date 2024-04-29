import { DeleteDropdownItemCatagories } from "@/components/admin/CategoryAction";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { ArrowBigRight, MoreVertical } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

async function getCategoryData() {
  noStore();
  const data = await db.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  return data;
}

export default async function CategoriesPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button asChild>
          <Link href="/admin/categories/newCategory">Add Category</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  const data = await getCategoryData();
  if (data === undefined) {
    return <p className="text-muted-foreground mt-12">No Categories yet</p>;
  }
  return (
    <Table className="mt-11 no-scrollbar">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((category: any) => (
          <TableRow key={category.id}>
            <TableHead>{category.name}</TableHead>
            <TableHead>
              {category.description ?? "No description"}
            </TableHead>
            <TableHead>
              <Link href={`/admin/categories`}>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="text-muted-foreground" />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropdownItemCatagories {...category} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </Link>
            </TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

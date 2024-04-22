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
import Link from "next/link";

async function getCategoryData() {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoriesPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <h1 className="font-bold text-3xl">Categories</h1>
        <Button asChild>
          <Link href="/admin/categories/newCategory">Add Category</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  const categoryData = await getCategoryData();
  if (categoryData === undefined) {
    return <p className="text-muted-foreground mt-12">No Categories yet</p>;
  }
  return (
    <Table className="mt-11 no-scrollbar">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoryData.map((category: any) => (
          <TableRow
            className="flex justify-between items-center"
            key={category.id}
          >
            <TableHead>{category.name}</TableHead>
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

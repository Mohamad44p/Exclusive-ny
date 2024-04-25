import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CreateCategory } from "@/app/actions";

export default function CategoryForm() {
  return (
    <form action={CreateCategory} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="category">Category Name</Label>
        <Input id="category" name="category" required />
        <Label htmlFor="category">Category Description</Label>
        <Input id="categoryDec" name="categoryDec" required />
      </div>
      <Button type="submit">Add</Button>
    </form>
  );
}

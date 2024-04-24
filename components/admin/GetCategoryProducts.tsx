import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface GetCategoryProductsProps {
  categories: any[];
  onSelectCategory: (category: any) => void;
}

export default function GetCategoryProducts({
  categories,
  onSelectCategory,
}: GetCategoryProductsProps) {
  return (
    <div>
      <Label htmlFor="category">Category</Label>
      <Input type="hidden" id="category" name="category" required />
      <Select name="category" required>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />{" "}
        </SelectTrigger>
        <SelectContent className="h-40">
          {categories.map((category: any) => (
            <SelectItem
              key={category.id}
              value={category.id}
              onClick={() => onSelectCategory(category)}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

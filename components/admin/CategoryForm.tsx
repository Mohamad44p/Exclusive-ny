"use client";

import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addCategory } from "@/app/admin/_actions/Category";

export default function CategoryForm() {
  const router = useRouter();
  const [category, setCategory] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", category);

    try {
      await addCategory(formData);
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCategory(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          value={category}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Add</Button>
    </form>
  );
}
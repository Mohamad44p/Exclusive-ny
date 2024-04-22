"use server";

import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const addSchema = z.object({
  name: z.string().min(1),
});

export async function addCategory(formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await db.category.create({
    data: {
      name: data.name,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCatagories(id: string) {
  try {
    const catagories = await db.category.findUnique({ where: { id } });
    if (catagories == null) return notFound();

    await db.category.deleteMany({
      where: {
        id: catagories.id,
      },
    });

    await db.category.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/admin/categories");
  } catch (error) {
    console.error("Error deleting Categories:", error);
    throw error;
  }
}
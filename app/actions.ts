"use server";

import db from "@/db/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export async function updateUsername(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const username = formData.get("username") as string;

  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
      },
    });

    return {
      message: "Successfully Updated name",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This username is already used",
          status: "error",
        };
      }
    }

    throw e;
  }
}

export async function CreateProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const name = formData.get("proName") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;

  const data = await db.product.create({
    data: {
      name: name,
      imagePath: imageUrl ?? undefined,
      price: price,
      description: description,
      isAvailableForPurchase: false,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  return redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath("/");
  revalidatePath("/admin/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });

  if (product == null) return notFound();

  revalidatePath("/");
  revalidatePath("/admin/products");
}

export async function deleteUser(id: string) {
  const user = await db.user.delete({ where: { id } });

  if (user == null) return notFound();

  revalidatePath("/");
  revalidatePath("/admin/customers");
}

export async function CreateCategory(formData: FormData) {
  const name = formData.get("category") as string;
  const description = formData.get("categoryDec") as string;

  const data = await db.category.create({
    data: {
      name: name,
      description: description,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return redirect("/admin/categories");
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

import db from "@/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    return NextResponse.error();
  }
}

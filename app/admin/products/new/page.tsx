"use client";

import { CreateProduct } from "@/app/actions";
import { SubmitButton } from "@/components/Custommers/SubmitButtons";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/uploadthings/Uploadthing";
import db from "@/db/db";
import AdProductnewimage from "@/public/images/AdProductnewimage.png";
import { Category } from "@prisma/client";
import { ImageUp, Text } from "lucide-react";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";

const rules = [
  {
    id: 1,
    text: "The product name must be unique",
  },
  {
    id: 2,
    text: "The product price must be greater than 0",
  },
  {
    id: 3,
    text: "The product description must be at least 10 characters",
  },
  {
    id: 4,
    text: "The product image must be a valid URL",
  },
  {
    id: 5,
    text: "The product image prefer to be a Good Quality Image",
  },
];

export default function AdminCreateProductPage() {
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [name, setName] = useState<null | string>(null);
  const [price, setPrice] = useState<null | number>(null);
  const [category, setCategory] = useState<null | number>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1 className="font-semibold"></h1>
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post">
              <Text className="h-4 w-4 mr-2" /> Post
            </TabsTrigger>
            <TabsTrigger value="image">
              <ImageUp className="h-4 w-4 mr-2" />
              Image & Video
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <form action={CreateProduct}>
                <input
                  type="hidden"
                  name="imageUrl"
                  value={imageUrl ?? undefined}
                />

                <CardHeader>
                  <Label>Product Name</Label>
                  <Input
                    required
                    name="proName"
                    placeholder="Product Name"
                    value={name ?? ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Label>Product Price</Label>
                  <Input
                    required
                    name="price"
                    placeholder="$0.00"
                    value={price ?? ""}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                  />
                  <Label>Product Category</Label>
                  <select name="Category">
                    {Array.isArray(category) &&
                      category.map((item: Category) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  <Label>Product Description</Label>
                  <Textarea
                    required
                    name="description"
                    placeholder="Product Description"
                  />
                </CardHeader>
                <CardFooter>
                  <SubmitButton text="Create Post" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <Card>
              <CardHeader>
                {imageUrl === null ? (
                  <UploadDropzone
                    className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImageUrl(res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      alert("Error");
                    }}
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt="uploaded image"
                    width={500}
                    height={400}
                    className="h-80 rounded-lg w-full object-contain"
                  />
                )}
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[35%]">
        <Card className="flex flex-col p-4">
          <div className="flex items-center gap-x-2">
            <Image className="h-10 w-10" src={AdProductnewimage} alt="pfp" />
            <h1 className="font-medium">Posting to Exclusive</h1>
          </div>
          <Separator className="mt-2" />

          <div className="flex flex-col gap-y-5 mt-5">
            {rules.map((item) => (
              <div key={item.id}>
                <p className="text-sm font-medium">
                  {item.id}. {item.text}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

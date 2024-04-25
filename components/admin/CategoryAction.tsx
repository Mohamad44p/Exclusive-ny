"use client";

import { deleteCatagories } from "@/app/actions";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function DeleteDropdownItemCatagories({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteCatagories(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
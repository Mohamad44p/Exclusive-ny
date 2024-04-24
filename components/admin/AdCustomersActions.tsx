"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/app/actions";

export default function AdCustomersActions({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Button
        className="text-red-500"
        size="icon"
        variant="outline"
        disabled={disabled || isPending}
        onClick={() => {
          startTransition(async () => {
            await deleteUser(id);
            router.refresh();
          });
        }}
      >
        <TrashIcon className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}

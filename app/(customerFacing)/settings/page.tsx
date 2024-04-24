import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import db from "@/db/db";
import { SettingsForm } from "@/components/Custommers/SettingsForm";

async function getData(userId: string) {
  noStore();
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
    },
  });

  return data;
}

export default async function SettingsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  const data = await getData(user.id);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
      <SettingsForm username={data?.userName} />
    </div>
  );
}

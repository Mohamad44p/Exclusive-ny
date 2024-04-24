import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function CusNavShowAdmin() {
  const { isAuthenticated, getPermission } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  const requiredPermission = await getPermission("admin-pages");

  if (!isLoggedIn || !requiredPermission?.isGranted) {
    return null;
  }
  return (
    <div>
      {isLoggedIn && requiredPermission?.isGranted ? (
        <Link href="/admin" className="text-foreground hover:text-foreground">
          AdminPage
        </Link>
      ) : null}
    </div>
  );
}

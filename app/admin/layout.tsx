import AdNavbar from "@/components/admin/AdNavbar";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdNavbar />
      <div className="container my-6">{children}</div>
    </>
  );
}

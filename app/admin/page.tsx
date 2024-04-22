import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import db from "@/db/db";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaid: true },
    _count: true,
  });

  return {
    amount: data._sum.pricePaid || 0,
    numberOfSales: data._count || 0,
  };
}

async function getUserData() {
  const [userCount, OrderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaid: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (OrderData._sum.pricePaid || 0) / userCount,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({
      where: { isAvailableForPurchase: true },
    }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    activeCount,
    inactiveCount,
  };
}

export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${salesData.amount}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {salesData.numberOfSales} sales
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.userCount}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ${userData.averageValuePerUser} average value per user
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {productData.activeCount + productData.inactiveCount} Products
              </CardTitle>
              <ActivityIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {productData.activeCount} / {productData.inactiveCount}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Active / Inactive
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

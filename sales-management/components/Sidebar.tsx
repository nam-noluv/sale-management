"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-[250px] min-h-screen bg-blue-600 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        Sales Manager
      </h1>

      <div className="flex flex-col gap-4">

        <Link
          href="/dashboard"
          className="hover:bg-blue-500 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          href="/products"
          className="hover:bg-blue-500 p-2 rounded"
        >
          Products
        </Link>

        <Link
          href="/customers"
          className="hover:bg-blue-500 p-2 rounded"
        >
          Customers
        </Link>
        <Link
          href="/order"
          className="hover:bg-blue-500 p-2 rounded"
        >
          Order
        </Link>

      </div>
    </div>
  );
}
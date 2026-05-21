"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export default function Dashboard() {
   const [totalProducts, setTotalProducts] =
  useState(0);

   const [totalCustomers, setTotalCustomers] =
  useState(0);

   const [totalOrders, setTotalOrders] =
  useState(0);

  const { user, loading } = useAuth();
  const router = useRouter();

  const getDashboardData = async () => {

  try {

    // Products
    const productSnapshot =
      await getDocs(
        collection(db, "products")
      );

    setTotalProducts(
      productSnapshot.docs.length
    );

    // Customers
    const customerSnapshot =
      await getDocs(
        collection(db, "customers")
      );

    setTotalCustomers(
      customerSnapshot.docs.length
    );

    // Orders
    const orderSnapshot =
      await getDocs(
        collection(db, "orders")
      );

    setTotalOrders(
      orderSnapshot.docs.length
    );

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {

  const fetchData = async () => {
    await getDashboardData();
  };

  fetchData();

  if (!loading && !user) {
    router.replace("/login");
  }

}, [loading, user, router]);

  const logout = async () => {
    await signOut(auth);

    router.replace("/login");
  };

  if (loading) {
    return <p className="p-5">Loading...</p>;
  }

 

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-10 bg-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              TRANG CHỦ
            </h1>

            <p className="text-gray-500 mt-1">
              Xin chào: {user?.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            THOÁT ĐĂNG NHẬP
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-gray-500">
              SẢN PHẨM BÁN CHẠY
            </h2>

            <p className="text-3xl font-bold mt-2">
               {totalProducts}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-gray-500">
              KHÁCH HÀNG
            </h2>

            <p className="text-3xl font-bold mt-2">
              {totalCustomers}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-gray-500">
              ĐƠN HÀNG
            </h2>

            <p className="text-3xl font-bold mt-2">
              {totalOrders}

            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
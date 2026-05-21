"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import { db } from "@/firebase/config";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

type Order = {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  total: number;
};

export default function OrdersPage() {

  const [customerName, setCustomerName] =
    useState("");

  const [productName, setProductName] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [editId, setEditId] =
    useState("");   

  // GET ORDERS
  const getOrders = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "orders")
      );

      const orderList =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];

      setOrders(orderList);

    } catch (error) {
      console.log(error);
    }
  };

  // ADD ORDER
  const addOrder = async () => {

    try {

      const total =
        Number(quantity) * Number(price);

      await addDoc(collection(db, "orders"), {
        customerName,
        productName,
        quantity: Number(quantity),
        total,
      });

      alert("Order added!");

      setCustomerName("");
      setProductName("");
      setQuantity("");
      setPrice("");

      getOrders();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT ORDER
  const editOrder = (
  id: string,
  currentCustomer: string,
  currentProduct: string,
  currentQuantity: number,
  currentTotal: number
) => {

  setEditId(id);

  setCustomerName(currentCustomer);

  setProductName(currentProduct);

  setQuantity(
    currentQuantity.toString()
  );

  setPrice(
    (
      currentTotal / currentQuantity
    ).toString()
  );
};

  // UPDATE ORDER
const updateOrder = async () => {

  try {

    const orderRef =
      doc(db, "orders", editId);

    const total =
      Number(quantity) * Number(price);

    await updateDoc(orderRef, {
      customerName,
      productName,
      quantity: Number(quantity),
      total,
    });

    alert("Order updated!");

    setEditId("");

    setCustomerName("");
    setProductName("");
    setQuantity("");
    setPrice("");

    getOrders();

  } catch (error) {
    console.log(error);
  }
};

  // DELETE ORDER
  const deleteOrder = async (
    id: string
  ) => {

    try {

      await deleteDoc(
        doc(db, "orders", id)
      );

      getOrders();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const fetchOrders = async () => {
      await getOrders();
    };

    fetchOrders();

  }, []);

  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-5">
          Order Management
        </h1>

        <div className="flex flex-col gap-4 w-[300px]">

          <input
            type="text"
            placeholder="Customer Name"
            className="border p-2 rounded"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 rounded"
            value={productName}
            onChange={(e) =>
              setProductName(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 rounded"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <button
             onClick={
              editId
              ? updateOrder
              : addOrder
            }
            className="bg-blue-500 text-white p-2 rounded"
          >
            {editId
              ? "Update Order"
              : "Add Order"}
          </button>

        </div>

        <div className="mt-10">

          {orders.map((order) => (

            <div
              key={order.id}
              className="border p-4 rounded mb-3"
            >
              <h2 className="font-bold">
                {order.customerName}
              </h2>

              <p>
                Product:
                {" "}
                {order.productName}
              </p>

              <p>
                Quantity:
                {" "}
                {order.quantity}
              </p>

              <p>
                Total:
                {" "}
                {order.total.toLocaleString()}
                {" "}
                VND
              </p>

              <button
                onClick={() =>
                  deleteOrder(order.id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Delete
              </button>
              <button
                 onClick={() =>
                    editOrder(
                         order.id,
                         order.customerName,
                         order.productName,
                         order.quantity,
                         order.total
                            )
                             }
                className="bg-yellow-500 text-white px-3 py-1 rounded mt-2 ml-2"
                >
                     Edit
                </button>

                </div>

                ))}

        </div>

      </div>

    </div>
  );
}
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

type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
};

export default function CustomersPage() {

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [editId, setEditId] = useState("");

  // GET CUSTOMERS
  const getCustomers = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "customers")
      );

      const customerList =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Customer[];

      setCustomers(customerList);

    } catch (error) {
      console.log(error);
    }
  };

  // ADD CUSTOMER
  const addCustomer = async () => {

    try {

      await addDoc(collection(db, "customers"), {
        name,
        phone,
        address,
      });

      alert("Customer added!");

      setName("");
      setPhone("");
      setAddress("");

      getCustomers();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE CUSTOMER
  const deleteCustomer = async (
    id: string
  ) => {

    try {

      await deleteDoc(
        doc(db, "customers", id)
      );

      getCustomers();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT CUSTOMER
  const editCustomer = (
    id: string,
    currentName: string,
    currentPhone: string,
    currentAddress: string
  ) => {

    setEditId(id);

    setName(currentName);

    setPhone(currentPhone);

    setAddress(currentAddress);
  };

  // UPDATE CUSTOMER
  const updateCustomer = async () => {

    try {

      const customerRef =
        doc(db, "customers", editId);

      await updateDoc(customerRef, {
        name,
        phone,
        address,
      });

      alert("Customer updated!");

      setEditId("");

      setName("");
      setPhone("");
      setAddress("");

      getCustomers();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const fetchCustomers = async () => {
      await getCustomers();
    };

    fetchCustomers();

  }, []);

  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-5">
          Customer Management
        </h1>

        <div className="flex flex-col gap-4 w-[300px]">

          <input
            type="text"
            placeholder="Customer name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="border p-2 rounded"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-2 rounded"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <button
            onClick={
              editId
                ? updateCustomer
                : addCustomer
            }
            className="bg-blue-500 text-white p-2 rounded"
          >
            {editId
              ? "Update Customer"
              : "Add Customer"}
          </button>

        </div>

        <div className="mt-10">

          {customers.map((customer) => (

            <div
              key={customer.id}
              className="border p-4 rounded mb-3"
            >
              <h2 className="font-bold">
                {customer.name}
              </h2>

              <p>{customer.phone}</p>

              <p>{customer.address}</p>

              <button
                onClick={() =>
                  deleteCustomer(customer.id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Delete
              </button>

              <button
                onClick={() =>
                  editCustomer(
                    customer.id,
                    customer.name,
                    customer.phone,
                    customer.address
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
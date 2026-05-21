"use client";

import { useEffect, useState } from "react"; 
import { db } from "@/firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc  } from "firebase/firestore";
import Sidebar from "@/components/Sidebar";

export default function ProductsPage() {
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(false);
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [products, setProducts] = useState<any[]>([]);
const [editId, setEditId] = useState("");
const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "products")
    );

    const productList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(productList);
  } catch (error) {
    console.log(error);
  }
};
const addProduct = async () => {

  setLoading(true);

  try {

    await addDoc(collection(db, "products"), {
      name,
      price: Number(price),
    });

    getProducts();

  } catch (error) {
    console.log(error);
  }

  setLoading(false);
};

const deleteProduct = async (id: string) => {
    const confirmDelete = confirm(
    "Bạn có chắc muốn xóa?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "products", id));

    getProducts();
  } catch (error) {
    console.log(error);
  }
};
const editProduct = (
  id: string,
  currentName: string,
  currentPrice: number
) => {
  setEditId(id);

  setName(currentName);

  setPrice(currentPrice.toString());
};
const updateProduct = async () => {
  try {
    const productRef = doc(db, "products", editId);

    await updateDoc(productRef, {
      name: name,
      price: Number(price),
    });
    await getProducts();

    alert("Product updated!");

    setEditId("");

    setName("");

    setPrice("");

  
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  const fetchProducts = async () => {
    await getProducts();
  };

  fetchProducts();
}, []);

  
   const filteredProducts = products.filter(
  (product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
);
  return (
  <div className="flex min-h-screen">

    <Sidebar />

    <div className="flex-1 p-10">

      <h1 className="text-3xl font-bold mb-5">
        Product Management
      </h1>

      <div className="flex flex-col gap-4 w-[300px]">

        <input
          type="text"
          placeholder="Product name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
  type="text"
  placeholder="Search product..."
  className="border p-2 rounded mt-4"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>

        <button
  onClick={editId ? updateProduct : addProduct}
  className="bg-blue-500 text-white p-2 rounded"
>

  {loading
    ? "Loading..."
    : editId
    ? "Update Product"
    : "Add Product"}

</button>

      </div>

      <div className="mt-10">
        
        {filteredProducts.length === 0 && (
          <p className="text-gray-500 mt-5">
               No products found
          </p>
          )}

        {filteredProducts.map((product) => (

          <div
            key={product.id}
            className="border p-3 rounded mb-3"
          >
            <h2 className="font-bold">
              {product.name}
            </h2>

            <p>
              {product.price.toLocaleString()} VND
            </p>

            <button
              onClick={() =>
                deleteProduct(product.id)
              }
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            >
              Delete
            </button>

            <button
              onClick={() =>
                editProduct(
                  product.id,
                  product.name,
                  product.price
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
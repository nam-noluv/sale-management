"use client";

import { useState } from "react";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");
    const register = async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Register success!");
        router.push("/login");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Register
      </h1>

      <div className="flex flex-col gap-4 w-[300px]">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button  onClick={register} className="bg-green-500 text-white p-2 rounded">
          Register
           
        </button>
      </div>
    </div>
  );
}
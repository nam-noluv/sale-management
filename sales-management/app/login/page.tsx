"use client";

import { useState } from "react";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const router = useRouter();

const login = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Login success!");

    router.push("/dashboard");
  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Login
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

        <button
  onClick={login}
  className="bg-blue-500 text-white p-2 rounded"
>
  Login
</button>
      </div>
    </div>
  );
}
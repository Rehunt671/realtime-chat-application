"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
const App = () => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [router]);
};

export default App;

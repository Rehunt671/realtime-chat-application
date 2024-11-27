"use client";

import { redirect } from "next/navigation";
import { useAppSelector } from "stores/hook";
import { selectUser } from "stores/slices/userSlice";

const App = () => {
  const user = useAppSelector(selectUser);
  if (user) redirect("/dashboard");
  else redirect("/login");
};

export default App;

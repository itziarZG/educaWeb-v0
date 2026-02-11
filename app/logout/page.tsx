"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";

export default function LogoutPage() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Cerrando sesión...</p>
    </div>
  );
}

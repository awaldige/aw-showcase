"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AdminAuthProps {
  children: ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("aw_admin_auth");

    if (auth !== "true") {
      router.replace("/admin/login");
      return;
    }

    setAutenticado(true);
    setVerificando(false);
  }, [router]);

  if (verificando || !autenticado) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">
            Verificando acesso...
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
"use client";

import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  function handleLogout() {
    sessionStorage.removeItem("aw_admin_auth");
    router.push("/admin/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="
        inline-flex
        items-center
        justify-center
        rounded-full
        border
        border-gray-300
        bg-white
        px-5
        py-2.5
        text-sm
        font-semibold
        text-gray-800
        transition
        hover:border-red-300
        hover:bg-red-50
        hover:text-red-600
      "
    >
      Sair
    </button>
  );
}
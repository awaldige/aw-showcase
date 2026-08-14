
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { excluirProduto } from "@/services/api";

interface ProdutoAcoesProps {
  produtoId: number;
}

export default function ProdutoAcoes({
  produtoId,
}: ProdutoAcoesProps) {
  const router = useRouter();
  const [excluindo, setExcluindo] = useState(false);

  const handleExcluir = async () => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setExcluindo(true);

      await excluirProduto(produtoId);

      router.refresh();
    } catch (error) {
      console.error(error);
      window.alert("Não foi possível excluir o produto.");
    } finally {
      setExcluindo(false);
    }
  };

  return (
    <div className="flex gap-2">

      {/* EDITAR */}
      <Link
        href={`/admin/produtos/${produtoId}/editar`}
        className="
          rounded-full
          border
          border-gray-300
          px-4
          py-2
          text-sm
          font-medium
          text-gray-700
          transition
          hover:border-gray-950
          hover:text-gray-950
        "
      >
        Editar
      </Link>

      {/* EXCLUIR */}
      <button
        type="button"
        onClick={handleExcluir}
        disabled={excluindo}
        className="
          rounded-full
          border
          border-red-200
          px-4
          py-2
          text-sm
          font-medium
          text-red-600
          transition
          hover:bg-red-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {excluindo ? "Excluindo..." : "Excluir"}
      </button>

    </div>
  );
}

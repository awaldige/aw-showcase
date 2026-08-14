"use client";

import { useState } from "react";
import ProdutoCard from "@/components/ProdutoCard";

interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: string | number;
  imagem?: string;
  categoria?: {
    nome: string;
  };
}

interface FiltroCategoriasProps {
  produtos: Produto[];
}

export default function FiltroCategorias({
  produtos,
}: FiltroCategoriasProps) {
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Todos");

  const categorias = [
    "Todos",
    "Brincos",
    "Colares",
    "Pulseiras",
  ];

  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter(
          (produto) =>
            produto.categoria?.nome === categoriaSelecionada
        );

  return (
    <div>
      {/* Filtros */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {categorias.map((categoria) => {
          const ativa = categoriaSelecionada === categoria;

          return (
            <button
              key={categoria}
              type="button"
              onClick={() => setCategoriaSelecionada(categoria)}
              className={`
                rounded-full
                px-6
                py-2.5
                text-sm
                font-medium
                transition-all
                duration-300
                ${
                  ativa
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {categoria}
            </button>
          );
        })}
      </div>

      {/* Produtos */}
      {produtosFiltrados.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-500">
            Nenhum produto encontrado nesta categoria.
          </p>
        </div>
      )}
    </div>
  );
}
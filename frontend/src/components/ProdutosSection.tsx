
"use client";

import { useMemo, useState } from "react";
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

interface ProdutosSectionProps {
  produtos: Produto[];
}

export default function ProdutosSection({
  produtos,
}: ProdutosSectionProps) {
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Todos");

  const produtosFiltrados = useMemo(() => {
    if (categoriaSelecionada === "Todos") {
      return produtos;
    }

    return produtos.filter(
      (produto) =>
        produto.categoria?.nome.toLowerCase() ===
        categoriaSelecionada.toLowerCase()
    );
  }, [produtos, categoriaSelecionada]);

  const categorias = ["Todos", "Brincos", "Colares", "Pulseiras"];

  return (
    <section
      id="produtos"
      className="bg-white px-6 py-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Cabeçalho */}
        <div className="mb-10 text-center">

          <span className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Nossa coleção
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Produtos em destaque
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore nossa coleção e encontre o acessório
            perfeito para cada momento.
          </p>

        </div>

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
                      : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
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

          <div className="rounded-3xl border border-dashed border-gray-300 py-16 text-center">

            <p className="text-gray-500">
              Nenhum produto encontrado nesta categoria.
            </p>

          </div>

        )}

        {/* Contador */}
        <p className="mt-8 text-center text-sm text-gray-400">
          {produtosFiltrados.length}{" "}
          {produtosFiltrados.length === 1
            ? "produto encontrado"
            : "produtos encontrados"}
        </p>

      </div>
    </section>
  );
}

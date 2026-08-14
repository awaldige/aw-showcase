"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string | number;
  imagem?: string | null;
  destaque: boolean;
  ativo: boolean;
  categoria?: {
    id: number;
    nome: string;
  };
}

// =====================================================
// URL BASE DO BACKEND
// =====================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ||
  "http://localhost:3001";

// =====================================================
// CONVERTER IMAGEM PARA URL CORRETA
// =====================================================

function getImagemUrl(imagem?: string | null) {
  if (!imagem) {
    return null;
  }

  const nomeImagem = imagem.trim();

  if (!nomeImagem) {
    return null;
  }

  // ===================================================
  // URL COMPLETA
  // ===================================================

  if (
    nomeImagem.startsWith("http://") ||
    nomeImagem.startsWith("https://")
  ) {
    return nomeImagem;
  }

  // ===================================================
  // IMAGEM DO BACKEND
  // Exemplo:
  // /uploads/foto.jpg
  // ===================================================

  if (nomeImagem.startsWith("/uploads/")) {
    return `${API_URL}${nomeImagem}`;
  }

  // ===================================================
  // IMAGENS ANTIGAS LOCAIS
  // Estão em:
  // frontend/public/produtos/
  // ===================================================

  const imagensLocais = [
    "brinco-dourado.jpg",
    "colar-elegante.jpg",
    "pulseira-delicada.jpg",
  ];

  const nomeArquivo = nomeImagem
    .replace(/^\/+/, "")
    .toLowerCase();

  if (imagensLocais.includes(nomeArquivo)) {
    return `/produtos/${nomeArquivo}`;
  }

  // ===================================================
  // SE O BANCO JÁ RETORNAR /produtos/...
  // ===================================================

  if (nomeImagem.startsWith("/produtos/")) {
    return nomeImagem;
  }

  // ===================================================
  // SE VIER SOMENTE O NOME DO ARQUIVO
  // As imagens novas ficam no backend /uploads
  // ===================================================

  return `${API_URL}/uploads/${nomeArquivo}`;
}

// =====================================================
// PÁGINA
// =====================================================

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // ===================================================
  // CARREGAR PRODUTOS
  // ===================================================

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch(`${API_URL}/api/produtos`, {
          cache: "no-store",
        });

        if (!resposta.ok) {
          throw new Error("Erro ao buscar produtos");
        }

        const dados = await resposta.json();

        setProdutos(dados);
      } catch (error) {
        console.error("ERRO AO CARREGAR PRODUTOS:", error);

        setErro("Não foi possível carregar os produtos.");
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, []);

  // ===================================================
  // BOTÃO VOLTAR
  // ===================================================

  const BotaoVoltar = () => (
    <Link
      href="/"
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
        hover:border-gray-950
        hover:bg-gray-50
        hover:-translate-y-0.5
      "
    >
      ← Voltar
    </Link>
  );

  // ===================================================
  // CARREGANDO
  // ===================================================

  if (carregando) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                AW Showcase
              </span>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
                Produtos
              </h1>

              <p className="mt-4 text-gray-600">
                Carregando produtos...
              </p>
            </div>

            <BotaoVoltar />
          </div>

        </div>
      </main>
    );
  }

  // ===================================================
  // ERRO
  // ===================================================

  if (erro) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                AW Showcase
              </span>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
                Produtos
              </h1>

              <p className="mt-4 text-red-600">
                {erro}
              </p>
            </div>

            <BotaoVoltar />
          </div>

        </div>
      </main>
    );
  }

  // ===================================================
  // PÁGINA
  // ===================================================

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              AW Showcase
            </span>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
              Nossos Produtos
            </h1>

            <p className="mt-2 text-gray-600">
              Confira nossos produtos.
            </p>
          </div>

          {/* BOTÃO VOLTAR */}
          <BotaoVoltar />

        </div>

        {/* =================================================
            PRODUTOS
        ================================================= */}

        {produtos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {produtos.map((produto) => {
              const imagemUrl = getImagemUrl(
                produto.imagem
              );

              return (
                <Link
                  key={produto.id}
                  href={`/produtos/${produto.id}`}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >

                  {/* =================================================
                      IMAGEM
                  ================================================= */}

                  <div className="relative h-72 overflow-hidden bg-gray-100">

                    {imagemUrl ? (
                      <img
                        src={imagemUrl}
                        alt={produto.nome}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                        onError={() => {
                          console.error(
                            "================================="
                          );

                          console.error(
                            "ERRO AO CARREGAR IMAGEM"
                          );

                          console.error(
                            "Produto:",
                            produto.nome
                          );

                          console.error(
                            "Imagem recebida:",
                            produto.imagem
                          );

                          console.error(
                            "URL final:",
                            imagemUrl
                          );

                          console.error(
                            "================================="
                          );
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        Sem imagem
                      </div>
                    )}

                    {/* =================================================
                        DESTAQUE
                    ================================================= */}

                    {produto.destaque && (
                      <span
                        className="
                          absolute
                          left-4
                          top-4
                          rounded-full
                          bg-gray-950
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          text-white
                          shadow-sm
                        "
                      >
                        ★ Destaque
                      </span>
                    )}

                  </div>

                  {/* =================================================
                      INFORMAÇÕES
                  ================================================= */}

                  <div className="p-6">

                    {produto.categoria && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {produto.categoria.nome}
                      </span>
                    )}

                    <h2 className="mt-2 text-xl font-semibold text-gray-950">
                      {produto.nome}
                    </h2>

                    {produto.descricao && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                        {produto.descricao}
                      </p>
                    )}

                    <p className="mt-5 text-2xl font-bold text-gray-950">
                      {Number(
                        produto.preco
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>

                    <div className="mt-5 text-sm font-semibold text-gray-900 transition group-hover:translate-x-1">
                      Ver detalhes →
                    </div>

                  </div>

                </Link>
              );
            })}

          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-gray-500">
              Nenhum produto disponível no momento.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
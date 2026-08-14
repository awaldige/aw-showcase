"use client";

import Link from "next/link";
import { gerarLinkWhatsApp } from "@/utils/whatsapp";

interface ProdutoCardProps {
  produto: {
    id: number;
    nome: string;
    descricao?: string;
    preco: string | number;
    imagem?: string | null;
    destaque?: boolean;
    categoria?: {
      nome: string;
    };
  };
}

export default function ProdutoCard({
  produto,
}: ProdutoCardProps) {
  const precoFormatado = Number(produto.preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // =====================================================
  // URL BASE DO BACKEND
  // =====================================================

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ||
    "http://localhost:3001";

  // =====================================================
  // URL DA IMAGEM
  // =====================================================

  const imagemProduto = (() => {
    if (!produto.imagem) {
      return null;
    }

    let imagem = produto.imagem.trim();

    if (!imagem) {
      return null;
    }

    // ===================================================
    // URL COMPLETA
    // ===================================================

    if (
      imagem.startsWith("http://") ||
      imagem.startsWith("https://")
    ) {
      return imagem;
    }

    // ===================================================
    // NORMALIZAR BARRAS
    // ===================================================

    imagem = imagem.replace(/\\/g, "/");

    // Remove barras iniciais
    imagem = imagem.replace(/^\/+/, "");

    // ===================================================
    // PEGAR SOMENTE O NOME DO ARQUIVO
    // ===================================================

    const nomeArquivo = imagem
      .split("/")
      .pop()
      ?.toLowerCase();

    // ===================================================
    // IMAGENS LOCAIS DO FRONTEND
    //
    // frontend/public/produtos/
    // ===================================================

    const imagensLocais = [
      "brinco-dourado.jpg",
      "colar-elegante.jpg",
      "pulseira-delicada.jpg",
    ];

    if (
      nomeArquivo &&
      imagensLocais.includes(nomeArquivo)
    ) {
      return `/produtos/${nomeArquivo}`;
    }

    // ===================================================
    // SE JÁ FOR /produtos/arquivo.jpg
    // ===================================================

    if (imagem.startsWith("produtos/")) {
      return `/${imagem}`;
    }

    // ===================================================
    // CORRIGIR:
    //
    // produtos/uploads/imagem.jpg
    //
    // PARA:
    //
    // uploads/imagem.jpg
    // ===================================================

    if (imagem.startsWith("produtos/uploads/")) {
      imagem = imagem.replace(/^produtos\/uploads\//, "");

      return `${apiUrl}/uploads/${imagem}`;
    }

    // ===================================================
    // IMAGEM DO BACKEND
    //
    // uploads/imagem.jpg
    // ===================================================

    if (imagem.startsWith("uploads/")) {
      return `${apiUrl}/${imagem}`;
    }

    // ===================================================
    // QUALQUER OUTRO ARQUIVO
    //
    // Exemplo:
    // brinco-argola-123.jpg
    // ===================================================

    return `${apiUrl}/uploads/${imagem}`;
  })();

  // =====================================================
  // DEBUG
  // =====================================================

  console.log("=================================");
  console.log("PRODUTO:", produto.nome);
  console.log("IMAGEM RECEBIDA:", produto.imagem);
  console.log("URL FINAL:", imagemProduto);
  console.log("=================================");

  // =====================================================
  // WHATSAPP
  // =====================================================

  const mensagemWhatsApp =
    `Olá! Tenho interesse no produto "${produto.nome}", ` +
    `no valor de ${precoFormatado}.`;

  const linkWhatsApp = gerarLinkWhatsApp(mensagemWhatsApp);

  return (
    <article
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
      {/* =====================================================
          IMAGEM
      ===================================================== */}

      <div className="relative h-72 w-full overflow-hidden bg-gray-100">
        {imagemProduto ? (
          <img
            src={imagemProduto}
            alt={produto.nome}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
            onError={(e) => {
              console.error(
                "ERRO AO CARREGAR IMAGEM:"
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
                imagemProduto
              );

              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              text-sm
              text-gray-400
            "
          >
            Sem imagem
          </div>
        )}

        {/* ===================================================
            CATEGORIA
        =================================================== */}

        {produto.categoria && (
          <div className="absolute left-4 top-4">
            <span
              className="
                rounded-full
                bg-white/90
                px-3
                py-1.5
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-gray-700
                shadow-sm
                backdrop-blur
              "
            >
              {produto.categoria.nome}
            </span>
          </div>
        )}

        {/* ===================================================
            DESTAQUE
        =================================================== */}

        {produto.destaque && (
          <div className="absolute right-4 top-4">
            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-gray-950
                px-3
                py-1.5
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-white
                shadow-sm
              "
            >
              <span aria-hidden="true">
                ★
              </span>

              Destaque
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          INFORMAÇÕES
      ===================================================== */}

      <div className="p-6">
        <h2
          className="
            text-xl
            font-semibold
            tracking-tight
            text-gray-950
          "
        >
          {produto.nome}
        </h2>

        {produto.descricao && (
          <p
            className="
              mt-2
              min-h-[48px]
              text-sm
              leading-6
              text-gray-500
            "
          >
            {produto.descricao}
          </p>
        )}

        {/* ===================================================
            PREÇO
        =================================================== */}

        <div className="mt-6">
          <span className="block text-xs text-gray-400">
            A partir de
          </span>

          <strong
            className="
              mt-1
              block
              text-2xl
              font-bold
              tracking-tight
              text-gray-950
            "
          >
            {precoFormatado}
          </strong>
        </div>

        {/* ===================================================
            AÇÕES
        =================================================== */}

        <div className="mt-6 flex flex-col gap-3">
          {/* VER DETALHES */}

          <Link
            href={`/produtos/${produto.id}`}
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-gray-950
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-gray-800
            "
          >
            Ver detalhes

            <span
              aria-hidden="true"
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </Link>

          {/* WHATSAPP */}

          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-gray-200
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-800
              transition-all
              duration-300
              hover:border-[#25D366]
              hover:text-[#159447]
              hover:shadow-sm
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19.11 17.21c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.79-.7-1.33-1.57-1.49-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.11 2.84c.14.18 1.93 2.95 4.68 4.14.65.28 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />

              <path d="M16.02 3.2c-7.08 0-12.84 5.75-12.84 12.82 0 2.26.59 4.47 1.72 6.42L3.1 28.8l6.51-1.71a12.8 12.8 0 0 0 6.4 1.7h.01c7.07 0 12.82-5.75 12.82-12.82S23.09 3.2 16.02 3.2zm0 23.49h-.01c-2 0-3.96-.54-5.67-1.56l-.41-.24-3.86 1.01 1.03-3.76-.27-.39a10.63 10.63 0 1 1 9.19 4.94z" />
            </svg>

            Tenho interesse
          </a>
        </div>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProdutoById } from "@/services/api";
import { gerarLinkWhatsApp } from "@/utils/whatsapp";

interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: string | number;
  imagem?: string | null;
  destaque?: boolean;
  ativo?: boolean;
  categoria?: {
    id?: number;
    nome: string;
  };
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// =====================================================
// URL BASE DO BACKEND
// =====================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(
    /\/api\/?$/,
    ""
  ) || "http://localhost:3001";

// =====================================================
// CONVERTER IMAGEM PARA URL CORRETA
// =====================================================

function getImagemUrl(imagem?: string | null) {
  if (!imagem) {
    return null;
  }

  let caminho = imagem.trim();

  if (!caminho) {
    return null;
  }

  // ===================================================
  // URL COMPLETA
  // ===================================================

  if (
    caminho.startsWith("http://") ||
    caminho.startsWith("https://")
  ) {
    return caminho;
  }

  // ===================================================
  // NORMALIZAR BARRAS
  // ===================================================

  caminho = caminho.replace(/\\/g, "/");

  // Remove barras iniciais
  caminho = caminho.replace(/^\/+/, "");

  // ===================================================
  // NOME DO ARQUIVO
  // ===================================================

  const nomeArquivo = caminho
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
  // /produtos/arquivo.jpg
  // ===================================================

  if (caminho.startsWith("produtos/")) {
    return `/${caminho}`;
  }

  // ===================================================
  // produtos/uploads/imagem.jpg
  // ===================================================

  if (caminho.startsWith("produtos/uploads/")) {
    const arquivo = caminho.replace(
      /^produtos\/uploads\//,
      ""
    );

    return `${API_URL}/uploads/${arquivo}`;
  }

  // ===================================================
  // uploads/imagem.jpg
  // ===================================================

  if (caminho.startsWith("uploads/")) {
    return `${API_URL}/${caminho}`;
  }

  // ===================================================
  // /uploads/imagem.jpg
  // ===================================================

  if (caminho.startsWith("/uploads/")) {
    return `${API_URL}${caminho}`;
  }

  // ===================================================
  // SOMENTE NOME DO ARQUIVO
  // ===================================================

  return `${API_URL}/uploads/${caminho}`;
}

// =====================================================
// PÁGINA DE DETALHES
// =====================================================

export default async function ProdutoDetalhes({
  params,
}: PageProps) {
  const { id } = await params;

  const produto: Produto | null =
    await getProdutoById(id);

  if (!produto) {
    notFound();
  }

  // ===================================================
  // PREÇO
  // ===================================================

  const precoFormatado =
    Number(produto.preco).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );

  // ===================================================
  // IMAGEM
  // ===================================================

  const imagemProduto =
    getImagemUrl(produto.imagem);

  // ===================================================
  // WHATSAPP
  // ===================================================

  const mensagemWhatsApp =
    `Olá! Tenho interesse no produto "${produto.nome}", ` +
    `no valor de ${precoFormatado}.`;

  const linkWhatsApp =
    gerarLinkWhatsApp(mensagemWhatsApp);

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <main className="min-h-screen bg-[#fafafa]">

      {/* =====================================================
          NAVEGAÇÃO
      ====================================================== */}

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
          <Link
            href="/produtos"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              transition-colors
              hover:text-gray-950
            "
          >
            <span
              aria-hidden="true"
              className="
                text-lg
                transition-transform
                duration-200
                group-hover:-translate-x-1
              "
            >
              ←
            </span>

            Voltar para produtos
          </Link>
        </div>
      </div>

      {/* =====================================================
          PRODUTO
      ====================================================== */}

      <section className="px-5 py-10 sm:px-6 sm:py-14 lg:py-16">

        <div
          className="
            mx-auto
            grid
            max-w-6xl
            overflow-hidden
            rounded-[2rem]
            border
            border-gray-200
            bg-white
            shadow-[0_18px_55px_rgba(0,0,0,0.06)]
            lg:grid-cols-2
          "
        >

          {/* =================================================
              IMAGEM
          ================================================== */}

          <div
            className="
              relative
              min-h-[430px]
              overflow-hidden
              bg-gray-100
              sm:min-h-[540px]
              lg:min-h-[620px]
            "
          >

            {imagemProduto ? (
              <Image
                src={imagemProduto}
                alt={produto.nome}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  hover:scale-[1.025]
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  min-h-[430px]
                  items-center
                  justify-center
                  text-sm
                  text-gray-400
                  sm:min-h-[540px]
                  lg:min-h-[620px]
                "
              >
                Sem imagem disponível
              </div>
            )}

            {/* =================================================
                BADGE DESTAQUE
            ================================================== */}

            {produto.destaque && (
              <div className="absolute left-5 top-5">
                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-gray-950/90
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    tracking-wide
                    text-white
                    shadow-lg
                    backdrop-blur-sm
                  "
                >
                  ★ Destaque
                </span>
              </div>
            )}

          </div>

          {/* =================================================
              INFORMAÇÕES
          ================================================== */}

          <div
            className="
              flex
              flex-col
              justify-center
              p-7
              sm:p-10
              lg:p-14
          "
          >

            {/* Categoria */}

            {produto.categoria && (
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-gray-400
                "
              >
                {produto.categoria.nome}
              </span>
            )}

            {/* Nome */}

            <h1
              className="
                mt-4
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-gray-950
                sm:text-4xl
                lg:text-[2.8rem]
              "
            >
              {produto.nome}
            </h1>

            {/* Descrição */}

            <p
              className="
                mt-6
                max-w-xl
                text-base
                leading-7
                text-gray-600
              "
            >
              {produto.descricao ||
                "Produto selecionado especialmente para a coleção AW Showcase."}
            </p>

            {/* Divisor */}

            <div className="my-8 h-px bg-gray-200" />

            {/* Preço */}

            <div>
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-gray-400
                "
              >
                Valor
              </span>

              <p
                className="
                  mt-2
                  text-3xl
                  font-bold
                  tracking-tight
                  text-gray-950
                  sm:text-4xl
                "
              >
                {precoFormatado}
              </p>
            </div>

            {/* =================================================
                AÇÕES
            ================================================== */}

            <div
              className="
                mt-9
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              {/* WhatsApp */}

              <a
                href={linkWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-green-600
                  px-7
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-green-700
                  hover:shadow-lg
                  hover:-translate-y-0.5
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    text-lg
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                >
                  💬
                </span>

                Tenho interesse
              </a>

              {/* Voltar */}

              <Link
                href="/produtos"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-300
                  bg-white
                  px-7
                  py-4
                  text-sm
                  font-semibold
                  text-gray-900
                  transition-all
                  duration-300
                  hover:border-gray-900
                  hover:bg-gray-50
                "
              >
                Ver produtos
              </Link>

            </div>

            {/* =================================================
                INFORMAÇÃO ADICIONAL
            ================================================== */}

            <div
              className="
                mt-9
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                p-5
                sm:p-6
              "
            >
              <div className="flex items-start gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-sm
                    shadow-sm
                  "
                >
                  ✓
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-gray-900
                    "
                  >
                    Gostou deste produto?
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    Fale conosco pelo WhatsApp para
                    consultar disponibilidade e obter
                    mais informações.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          RODAPÉ
      ====================================================== */}

      <section className="px-5 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl text-center">

          <div className="border-t border-gray-200 pt-8">

            <p
              className="
                text-sm
                font-medium
                text-gray-500
              "
            >
              AW Showcase
            </p>

            <p
              className="
                mt-1
                text-xs
                text-gray-400
              "
            >
              Elegância em cada detalhe.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          WHATSAPP FLUTUANTE
      ====================================================== */}

      <a
        href={linkWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Falar sobre ${produto.nome} pelo WhatsApp`}
        className="
          fixed
          bottom-5
          right-5
          z-50
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-green-600
          text-xl
          text-white
          shadow-[0_8px_30px_rgba(0,0,0,0.18)]
          transition-all
          duration-300
          hover:scale-110
          hover:bg-green-700
          hover:shadow-xl
          sm:bottom-6
          sm:right-6
        "
      >
        💬
      </a>

    </main>
  );
}


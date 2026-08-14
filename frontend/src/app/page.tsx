import Link from "next/link";
import Header from "@/components/Header";
import FiltroCategorias from "@/components/FiltroCategorias";
import { getProdutos } from "@/services/api";
import { gerarLinkWhatsApp } from "@/utils/whatsapp";

interface Produto {
  id: number;
  nome: string;
  descricao?: string | null;
  preco: string | number;
  imagem?: string | null;
  destaque?: boolean;
  ativo?: boolean;
  categoria?: {
    nome: string;
  };
}

export default async function Home() {
  const produtos: Produto[] = await getProdutos();

  // =====================================================
  // SOMENTE PRODUTOS MARCADOS COMO DESTAQUE
  // =====================================================

  const produtosDestaque = produtos.filter(
    (produto) => produto.destaque === true
  );

  const linkWhatsApp = gerarLinkWhatsApp(
    "Olá! Gostaria de saber mais sobre os produtos da AW Showcase."
  );

  // =====================================================
  // URL BASE DO BACKEND
  // =====================================================

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ||
    "http://localhost:3001";

  // =====================================================
  // CONVERTER IMAGEM PARA URL CORRETA
  // =====================================================

  const getImagemUrl = (imagem?: string | null) => {
    if (!imagem) {
      return null;
    }

    let valor = imagem.trim();

    if (!valor) {
      return null;
    }

    // ===================================================
    // URL COMPLETA
    // ===================================================

    if (
      valor.startsWith("http://") ||
      valor.startsWith("https://")
    ) {
      return valor;
    }

    // ===================================================
    // NORMALIZAR
    // ===================================================

    valor = valor.replace(/^\/+/, "");

    // ===================================================
    // IMAGENS LOCAIS DO FRONTEND
    //
    // frontend/public/produtos/
    // ===================================================

    const nomeArquivo = valor
      .split("/")
      .pop()
      ?.toLowerCase();

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
    // IMAGENS DO BACKEND
    // ===================================================

    if (valor.startsWith("uploads/")) {
      return `${apiUrl}/${valor}`;
    }

    if (valor.startsWith("produtos/uploads/")) {
      const arquivo = valor.replace(
        /^produtos\/uploads\//,
        ""
      );

      return `${apiUrl}/uploads/${arquivo}`;
    }

    // ===================================================
    // QUALQUER OUTRA IMAGEM
    // ===================================================

    return `${apiUrl}/uploads/${valor}`;
  };

  // =====================================================
  // NORMALIZAR PRODUTOS
  // =====================================================

  const produtosNormalizados = produtos.map((produto) => ({
    ...produto,
    descricao: produto.descricao ?? undefined,
    imagem: getImagemUrl(produto.imagem) ?? undefined,
  }));

  return (
    <>
      <Header />

      <main>
        {/* =================================================
            HERO
        ================================================== */}

        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-36">
            <div className="mx-auto max-w-4xl text-center">

              <span className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-600 shadow-sm">
                AW Showcase
              </span>

              <h1 className="mt-7 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-7xl">
                Elegância em cada
                <span className="block text-gray-500">
                  detalhe.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                Descubra nossa coleção de brincos, colares e
                pulseiras escolhidos para destacar seu estilo
                em todos os momentos.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

                <a
                  href="#produtos"
                  className="
                    inline-flex
                    min-w-44
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-950
                    px-7
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:-translate-y-0.5
                    hover:bg-gray-800
                    hover:shadow-lg
                  "
                >
                  Ver coleção
                  <span className="ml-2">→</span>
                </a>

                <a
                  href={linkWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    min-w-44
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-gray-300
                    bg-white
                    px-7
                    py-3.5
                    text-sm
                    font-semibold
                    text-gray-900
                    transition
                    hover:-translate-y-0.5
                    hover:border-gray-950
                    hover:shadow-md
                  "
                >
                  Falar conosco
                </a>

              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            CATEGORIAS
        ================================================== */}

        <section
          id="categorias"
          className="bg-white px-6 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto mb-12 max-w-2xl text-center">

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Explore
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Encontre seu estilo
              </h2>

              <p className="mt-4 text-gray-600">
                Escolha uma categoria e descubra peças que
                combinam com você.
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

              {/* BRINCOS */}

              <a
                href="#produtos"
                className="
                  group
                  rounded-3xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-8
                  text-center
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:shadow-xl
                "
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm transition group-hover:bg-gray-950 group-hover:text-white">
                  ✦
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-950">
                  Brincos
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Peças delicadas para complementar seu visual.
                </p>

                <span className="mt-6 inline-flex text-sm font-semibold text-gray-900">
                  Ver coleção
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>

              {/* COLARES */}

              <a
                href="#produtos"
                className="
                  group
                  rounded-3xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-8
                  text-center
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:shadow-xl
                "
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm transition group-hover:bg-gray-950 group-hover:text-white">
                  ◇
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-950">
                  Colares
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Elegância e personalidade em cada detalhe.
                </p>

                <span className="mt-6 inline-flex text-sm font-semibold text-gray-900">
                  Ver coleção
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>

              {/* PULSEIRAS */}

              <a
                href="#produtos"
                className="
                  group
                  rounded-3xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-8
                  text-center
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:shadow-xl
                "
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm transition group-hover:bg-gray-950 group-hover:text-white">
                  ◌
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-950">
                  Pulseiras
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Acessórios modernos para todos os momentos.
                </p>

                <span className="mt-6 inline-flex text-sm font-semibold text-gray-900">
                  Ver coleção
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>

            </div>
          </div>
        </section>

        {/* =================================================
            PRODUTOS EM DESTAQUE
        ================================================== */}

        <section
          id="produtos"
          className="bg-gray-50 px-6 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">

            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                  Nossa coleção
                </span>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  Produtos em destaque
                </h2>

                <p className="mt-3 max-w-2xl text-gray-600">
                  Confira os produtos selecionados para aparecer
                  em destaque na AW Showcase.
                </p>
              </div>

              <Link
                href="/produtos"
                className="inline-flex items-center text-sm font-semibold text-gray-900 transition hover:text-gray-500"
              >
                Ver todos
                <span className="ml-2">→</span>
              </Link>

            </div>

            {/* =================================================
                SOMENTE DESTAQUES
            ================================================== */}

            {produtosDestaque.length > 0 ? (

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {produtosDestaque.slice(0, 3).map((produto) => {

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
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-gray-400">
                            Sem imagem
                          </div>
                        )}

                        {/* BADGE DE DESTAQUE */}

                        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">
                          Destaque
                        </span>

                      </div>

                      <div className="p-6">

                        {produto.categoria && (
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {produto.categoria.nome}
                          </span>
                        )}

                        <h3 className="mt-2 text-xl font-semibold text-gray-950">
                          {produto.nome}
                        </h3>

                        {produto.descricao && (
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                            {produto.descricao}
                          </p>
                        )}

                        <div className="mt-5 flex items-center justify-between gap-4">

                          <p className="text-xl font-bold text-gray-950">
                            {Number(
                              produto.preco
                            ).toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              }
                            )}
                          </p>

                          <span className="text-sm font-semibold text-gray-900 transition group-hover:translate-x-1">
                            Ver detalhes →
                          </span>

                        </div>

                      </div>

                    </Link>
                  );
                })}

              </div>

            ) : (

              <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl">
                  ☆
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-950">
                  Nenhum produto em destaque
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Os produtos marcados como destaque no painel
                  administrativo aparecerão aqui.
                </p>

              </div>

            )}

          </div>
        </section>

        {/* =================================================
            TODA A COLEÇÃO
        ================================================== */}

        <section className="bg-white px-6 py-20 sm:py-24">

          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-2xl text-center">

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Descubra
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Toda a coleção
              </h2>

              <p className="mt-4 text-gray-600">
                Explore todos os produtos disponíveis e encontre
                o acessório perfeito.
              </p>

            </div>

            <div className="mt-10">

              <FiltroCategorias
                produtos={produtosNormalizados}
              />

            </div>

          </div>
        </section>

        {/* =================================================
            INSTITUCIONAL
        ================================================== */}

        <section className="bg-gray-50 px-6 py-20 sm:py-24">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              AW Showcase
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Elegância em cada detalhe
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
              Uma seleção especial de brincos, colares e
              pulseiras para quem valoriza estilo, qualidade
              e personalidade.
            </p>

          </div>

        </section>

        {/* =================================================
            CONTATO
        ================================================== */}

        <section
          id="contato"
          className="bg-gray-950 px-6 py-20 text-center text-white sm:py-24"
        >

          <div className="mx-auto max-w-3xl">

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Fale conosco
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Gostou de algum produto?
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
              Entre em contato pelo WhatsApp para consultar
              disponibilidade e obter mais informações sobre
              nossa coleção.
            </p>

            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-8
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                px-8
                py-3.5
                text-sm
                font-semibold
                text-gray-950
                shadow-sm
                transition
                hover:bg-gray-200
                hover:shadow-lg
              "
            >
              <span className="text-lg">💬</span>
              Falar pelo WhatsApp
            </a>

          </div>

        </section>

      </main>

      {/* =================================================
          FOOTER
      ================================================== */}

      <footer className="border-t border-gray-200 bg-white px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <div>

            <p className="text-sm text-gray-500">
              © 2026 AW Showcase. Todos os direitos reservados.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Desenvolvido por{" "}
              <span className="font-semibold text-gray-900">
                AW TECHNOLOGY
              </span>
            </p>

          </div>

          {/* ACESSO ADMINISTRATIVO */}

          <Link
            href="/admin"
            className="
              text-xs
              font-medium
              text-gray-400
              transition
              hover:text-gray-900
            "
          >
            Área administrativa →
          </Link>

        </div>

      </footer>

      {/* =================================================
          WHATSAPP FLUTUANTE
      ================================================== */}

      <a
        href={linkWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        title="Falar pelo WhatsApp"
        className="
          fixed
          bottom-6
          right-6
          z-50
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:scale-110
          hover:bg-[#20bd5a]
          hover:shadow-xl
        "
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-8 w-8"
          fill="currentColor"
          aria-hidden="true"
        >

          <path d="M19.11 17.21c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.79-.7-1.33-1.57-1.49-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.11 2.84c.14.18 1.93 2.95 4.68 4.14.65.28 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />

          <path d="M16.02 3.2c-7.08 0-12.84 5.75-12.84 12.82 0 2.26.59 4.47 1.72 6.42L3.1 28.8l6.51-1.71a12.8 12.8 0 0 0 6.4 1.7h.01c7.07 0 12.82-5.75 12.82-12.82S23.09 3.2 16.02 3.2zm0 23.49h-.01c-2 0-3.96-.54-5.67-1.56l-.41-.24-3.86 1.01 1.03-3.76-.27-.39a10.63 10.63 0 1 1 9.19 4.94z" />

        </svg>

      </a>
    </>
  );
}
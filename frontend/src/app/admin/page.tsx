import Link from "next/link";
import { getProdutos, getCategorias } from "@/services/api";
import ProdutoAcoes from "@/components/ProdutoAcoes";
import AdminLogout from "@/components/AdminLogout";
import AdminAuth from "@/components/AdminAuth";

export default async function AdminPage() {
  const [produtos, categorias] = await Promise.all([
    getProdutos(),
    getCategorias(),
  ]);

  const produtosDestaque = produtos.filter(
    (produto: { destaque?: boolean }) => produto.destaque
  );

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">

        {/* =========================
            HEADER ADMIN
        ========================== */}

        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                AW Showcase
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950">
                Painel Administrativo
              </h1>
            </div>

            {/* =========================
                AÇÕES DO CABEÇALHO
            ========================== */}

            <div className="flex flex-wrap items-center gap-3">

              {/* Ver vitrine */}

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
                "
              >
                ← Ver vitrine
              </Link>

              {/* Alterar usuário */}

              <Link
                href="/admin/alterar-usuario"
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
                "
              >
                👤 Alterar usuário
              </Link>

              {/* Alterar senha */}

              <Link
                href="/admin/alterar-senha"
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
                "
              >
                🔑 Alterar senha
              </Link>

              {/* Logout */}

              <AdminLogout />

            </div>
          </div>
        </header>

        {/* =========================
            CONTEÚDO
        ========================== */}

        <main className="mx-auto max-w-7xl px-6 py-10">

          {/* Título */}

          <div className="mb-8">

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Dashboard
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
              Visão geral
            </h2>

            <p className="mt-2 text-gray-600">
              Gerencie os produtos e categorias da AW Showcase.
            </p>

          </div>

          {/* =========================
              CARDS
          ========================== */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* Produtos */}

            <div
              className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
              "
            >
              <span className="text-sm font-medium text-gray-500">
                Produtos
              </span>

              <p className="mt-3 text-4xl font-bold text-gray-950">
                {produtos.length}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                produtos cadastrados
              </p>
            </div>

            {/* Categorias */}

            <div
              className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
              "
            >
              <span className="text-sm font-medium text-gray-500">
                Categorias
              </span>

              <p className="mt-3 text-4xl font-bold text-gray-950">
                {categorias.length}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                categorias cadastradas
              </p>
            </div>

            {/* Destaques */}

            <div
              className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
              "
            >
              <span className="text-sm font-medium text-gray-500">
                Destaques
              </span>

              <p className="mt-3 text-4xl font-bold text-gray-950">
                {produtosDestaque.length}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                produtos em destaque
              </p>
            </div>

          </div>

          {/* =========================
              PRODUTOS
          ========================== */}

          <section className="mt-10">

            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h3 className="text-xl font-bold text-gray-950">
                  Produtos
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Gerencie os produtos da sua vitrine.
                </p>

              </div>

              <Link
                href="/admin/produtos/novo"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-950
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-gray-800
                "
              >
                + Novo produto
              </Link>

            </div>

            {/* =========================
                LISTA
            ========================== */}

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              {produtos.length > 0 ? (

                <div className="divide-y divide-gray-100">

                  {produtos.map(
                    (produto: {
                      id: number;
                      nome: string;
                      preco: string | number;
                      destaque?: boolean;
                      categoria?: {
                        nome: string;
                      };
                    }) => {

                      const precoFormatado = Number(
                        produto.preco
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      });

                      return (
                        <div
                          key={produto.id}
                          className="
                            flex
                            flex-col
                            gap-4
                            p-5
                            transition
                            hover:bg-gray-50
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                          "
                        >

                          {/* Produto */}

                          <div>

                            <div className="flex flex-wrap items-center gap-2">

                              <h4 className="font-semibold text-gray-950">
                                {produto.nome}
                              </h4>

                              {produto.destaque && (
                                <span
                                  className="
                                    rounded-full
                                    bg-gray-950
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-white
                                  "
                                >
                                  ★ Destaque
                                </span>
                              )}

                            </div>

                            <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">

                              <span>
                                {produto.categoria?.nome ||
                                  "Sem categoria"}
                              </span>

                              <span>•</span>

                              <span>
                                {precoFormatado}
                              </span>

                            </div>

                          </div>

                          {/* Ações */}

                          <ProdutoAcoes
                            produtoId={produto.id}
                          />

                        </div>
                      );
                    }
                  )}

                </div>

              ) : (

                <div className="p-12 text-center">

                  <p className="text-gray-500">
                    Nenhum produto cadastrado.
                  </p>

                </div>

              )}

            </div>

          </section>

        </main>

        {/* =========================
            FOOTER
        ========================== */}

        <footer className="border-t border-gray-200 bg-white px-6 py-6">

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">

            <p className="text-sm text-gray-500">
              AW Showcase — Painel Administrativo
            </p>

            <p className="text-sm text-gray-500">
              Desenvolvido por{" "}
              <span className="font-semibold text-gray-900">
                AW TECHNOLOGY
              </span>
            </p>

          </div>

        </footer>

      </div>
    </AdminAuth>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  atualizarProduto,
  getCategorias,
  getProdutoById,
} from "@/services/api";

interface Categoria {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
  descricao?: string | null;
  preco: string | number;
  imagem?: string | null;
  categoriaId?: number;
  destaque?: boolean;
  ativo?: boolean;
  categoria?: {
    id: number;
    nome: string;
  };
}

export default function EditarProdutoPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  // =========================
  // DADOS DO PRODUTO
  // =========================

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  // =========================
  // STATUS
  // =========================

  const [destaque, setDestaque] = useState(false);
  const [ativo, setAtivo] = useState(true);

  // =========================
  // IMAGEM
  // =========================

  const [novaImagem, setNovaImagem] = useState<File | null>(null);
  const [imagemAtual, setImagemAtual] = useState("");

  // =========================
  // ESTADOS
  // =========================

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);

  // =========================
  // CARREGAR PRODUTO
  // =========================

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setMensagem("");

        const [produto, categoriasData] = await Promise.all([
          getProdutoById(id),
          getCategorias(),
        ]);

        if (!produto) {
          setMensagem("Produto não encontrado.");
          return;
        }

        const produtoData = produto as Produto;

        // =========================
        // DADOS
        // =========================

        setNome(produtoData.nome || "");

        setDescricao(produtoData.descricao || "");

        const precoInicial = String(
          produtoData.preco ?? ""
        ).replace(".", ",");

        setPreco(precoInicial);

        // =========================
        // CATEGORIA
        // =========================

        setCategoriaId(
          String(
            produtoData.categoriaId ??
              produtoData.categoria?.id ??
              ""
          )
        );

        // =========================
        // STATUS
        // =========================

        setDestaque(produtoData.destaque === true);

        setAtivo(
          produtoData.ativo === undefined
            ? true
            : produtoData.ativo === true
        );

        // =========================
        // IMAGEM
        // =========================

        setImagemAtual(produtoData.imagem || "");

        // =========================
        // CATEGORIAS
        // =========================

        setCategorias(categoriasData);
      } catch (error) {
        console.error(error);

        setMensagem(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os dados do produto."
        );
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      carregarDados();
    }
  }, [id]);

  // =========================
  // SALVAR ALTERAÇÕES
  // =========================

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSalvando(true);
    setMensagem("");
    setSucesso(false);

    try {
      // =========================
      // VALIDAR PREÇO
      // =========================

      const precoNumerico = Number(
        preco.replace(",", ".")
      );

      if (
        Number.isNaN(precoNumerico) ||
        precoNumerico < 0
      ) {
        throw new Error("Informe um preço válido.");
      }

      // =========================
      // VALIDAR CATEGORIA
      // =========================

      if (!categoriaId) {
        throw new Error("Selecione uma categoria.");
      }

      // =========================
      // ATUALIZAR
      // =========================

      await atualizarProduto(
        id,
        {
          nome,
          descricao,
          preco: precoNumerico,
          categoriaId: Number(categoriaId),
          imagem: novaImagem,
          destaque,
          ativo,
        } as Parameters<typeof atualizarProduto>[1]
      );

      setMensagem(
        "Produto atualizado com sucesso!"
      );

      setSucesso(true);

      // =========================
      // VOLTAR PARA ADMIN
      // =========================

      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error(error);

      setMensagem(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o produto."
      );

      setSucesso(false);
    } finally {
      setSalvando(false);
    }
  }

  // =========================
  // CARREGANDO
  // =========================

  if (carregando) {
    return (
      <main className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              AW Showcase
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-950">
              Editar produto
            </h1>
          </div>
        </header>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              Carregando produto...
            </p>
          </div>
        </section>
      </main>
    );
  }

  // =========================
  // PÁGINA
  // =========================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* =========================
          HEADER
      ========================== */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              AW Showcase
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950">
              Editar produto
            </h1>
          </div>

          <Link
            href="/admin"
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
            ← Voltar
          </Link>

        </div>
      </header>

      {/* =========================
          CONTEÚDO
      ========================== */}

      <section className="px-6 py-10">

        <div className="mx-auto max-w-3xl">

          <div className="mb-8">

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Produtos
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
              Editar produto
            </h2>

            <p className="mt-2 text-gray-600">
              Atualize os dados do produto da vitrine.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-6
              shadow-sm
              sm:p-8
            "
          >

            {/* =========================
                NOME
            ========================== */}

            <div>

              <label
                htmlFor="nome"
                className="text-sm font-semibold text-gray-900"
              >
                Nome do produto
              </label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(event) =>
                  setNome(event.target.value)
                }
                required
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-gray-950
                  focus:ring-1
                  focus:ring-gray-950
                "
              />

            </div>

            {/* =========================
                DESCRIÇÃO
            ========================== */}

            <div className="mt-6">

              <label
                htmlFor="descricao"
                className="text-sm font-semibold text-gray-900"
              >
                Descrição
              </label>

              <textarea
                id="descricao"
                value={descricao}
                onChange={(event) =>
                  setDescricao(event.target.value)
                }
                rows={4}
                className="
                  mt-2
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-gray-950
                  focus:ring-1
                  focus:ring-gray-950
                "
              />

            </div>

            {/* =========================
                PREÇO + CATEGORIA
            ========================== */}

            <div className="mt-6 grid gap-6 sm:grid-cols-2">

              <div>

                <label
                  htmlFor="preco"
                  className="text-sm font-semibold text-gray-900"
                >
                  Preço
                </label>

                <input
                  id="preco"
                  type="text"
                  inputMode="decimal"
                  value={preco}
                  onChange={(event) => {
                    const valor =
                      event.target.value;

                    if (
                      /^[0-9]*([,.][0-9]{0,2})?$/.test(
                        valor
                      )
                    ) {
                      setPreco(valor);
                    }
                  }}
                  required
                  placeholder="49,90"
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-gray-950
                    focus:ring-1
                    focus:ring-gray-950
                  "
                />

                <p className="mt-2 text-xs text-gray-500">
                  Digite o valor, por exemplo: 49,90
                </p>

              </div>

              <div>

                <label
                  htmlFor="categoriaId"
                  className="text-sm font-semibold text-gray-900"
                >
                  Categoria
                </label>

                <select
                  id="categoriaId"
                  value={categoriaId}
                  onChange={(event) =>
                    setCategoriaId(event.target.value)
                  }
                  required
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-gray-950
                    focus:ring-1
                    focus:ring-gray-950
                  "
                >

                  <option value="">
                    Selecione uma categoria
                  </option>

                  {categorias.map((categoria) => (
                    <option
                      key={categoria.id}
                      value={categoria.id}
                    >
                      {categoria.nome}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            {/* =========================
                STATUS DO PRODUTO
            ========================== */}

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">

              <div className="mb-4">

                <p className="text-sm font-semibold text-gray-900">
                  Status do produto
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Defina como o produto será exibido na vitrine.
                </p>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                {/* =========================
                    DESTAQUE
                ========================== */}

                <label
                  className={`
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-xl
                    border
                    p-4
                    transition
                    ${
                      destaque
                        ? "border-gray-950 bg-white shadow-sm"
                        : "border-gray-200 bg-white"
                    }
                  `}
                >

                  <input
                    type="checkbox"
                    checked={destaque}
                    onChange={(event) =>
                      setDestaque(event.target.checked)
                    }
                    className="
                      h-5
                      w-5
                      rounded
                      border-gray-300
                      text-gray-950
                      focus:ring-gray-950
                    "
                  />

                  <div>

                    <p className="text-sm font-semibold text-gray-900">
                      ⭐ Produto em destaque
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Exibir na seção de destaques.
                    </p>

                  </div>

                </label>

                {/* =========================
                    ATIVO
                ========================== */}

                <label
                  className={`
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-xl
                    border
                    p-4
                    transition
                    ${
                      ativo
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-white"
                    }
                  `}
                >

                  <input
                    type="checkbox"
                    checked={ativo}
                    onChange={(event) =>
                      setAtivo(event.target.checked)
                    }
                    className="
                      h-5
                      w-5
                      rounded
                      border-gray-300
                      text-green-600
                      focus:ring-green-500
                    "
                  />

                  <div>

                    <p className="text-sm font-semibold text-gray-900">
                      {ativo
                        ? "🟢 Produto ativo"
                        : "⚪ Produto inativo"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {ativo
                        ? "Produto disponível na vitrine."
                        : "Produto oculto da vitrine."}
                    </p>

                  </div>

                </label>

              </div>

            </div>

            {/* =========================
                IMAGEM ATUAL
            ========================== */}

            {imagemAtual && (
              <div className="mt-6">

                <p className="text-sm font-semibold text-gray-900">
                  Imagem atual
                </p>

                <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">

                  <img
                    src={`http://localhost:3001${imagemAtual}`}
                    alt={nome}
                    className="h-56 w-full object-contain"
                  />

                </div>

              </div>
            )}

            {/* =========================
                NOVA IMAGEM
            ========================== */}

            <div className="mt-6">

              <label
                htmlFor="imagem"
                className="text-sm font-semibold text-gray-900"
              >
                Nova imagem
              </label>

              <input
                id="imagem"
                type="file"
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                onChange={(event) => {

                  const arquivo =
                    event.target.files?.[0] || null;

                  if (
                    arquivo &&
                    arquivo.size > 5 * 1024 * 1024
                  ) {
                    setMensagem(
                      "A imagem deve ter no máximo 5 MB."
                    );

                    setNovaImagem(null);
                    event.target.value = "";

                    return;
                  }

                  setMensagem("");
                  setNovaImagem(arquivo);
                }}
                className="
                  mt-2
                  block
                  w-full
                  cursor-pointer
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-700
                  outline-none
                  transition
                  file:mr-4
                  file:rounded-full
                  file:border-0
                  file:bg-gray-950
                  file:px-4
                  file:py-2
                  file:text-sm
                  file:font-semibold
                  file:text-white
                  hover:file:bg-gray-800
                  focus:border-gray-950
                  focus:ring-1
                  focus:ring-gray-950
                "
              />

              {novaImagem && (
                <p className="mt-2 text-sm text-gray-600">
                  Nova imagem selecionada:{" "}

                  <span className="font-semibold text-gray-900">
                    {novaImagem.name}
                  </span>
                </p>
              )}

              <p className="mt-2 text-xs text-gray-500">
                Deixe vazio para manter a imagem atual.
                JPG, JPEG, PNG ou WEBP. Máximo: 5 MB.
              </p>

            </div>

            {/* =========================
                MENSAGEM
            ========================== */}

            {mensagem && (
              <div
                className={`
                  mt-6
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  ${
                    sucesso
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-gray-200 bg-gray-50 text-gray-700"
                  }
                `}
              >
                {mensagem}
              </div>
            )}

            {/* =========================
                AÇÕES
            ========================== */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="submit"
                disabled={salvando}
                className="
                  inline-flex
                  flex-1
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
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {salvando
                  ? "Salvando..."
                  : "Salvar alterações"}
              </button>

              <Link
                href="/admin"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-300
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-gray-800
                  transition
                  hover:border-gray-950
                  hover:bg-gray-50
                "
              >
                Cancelar
              </Link>

            </div>

          </form>

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================== */}

      <footer className="border-t border-gray-200 bg-white px-6 py-6">

        <div className="mx-auto max-w-7xl text-center">

          <p className="text-sm text-gray-500">
            AW Showcase — Painel Administrativo
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Desenvolvido por{" "}

            <span className="font-semibold text-gray-900">
              AW TECHNOLOGY
            </span>
          </p>

        </div>

      </footer>

    </main>
  );
}
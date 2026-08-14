
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Categoria {
  id: number;
  nome: string;
}

export default function NovoProdutoPage() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [categoriaId, setCategoriaId] = useState("");

  // NOVOS CAMPOS
  const [destaque, setDestaque] = useState(false);
  const [ativo, setAtivo] = useState(true);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregandoCategorias, setCarregandoCategorias] =
    useState(true);

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);

  // =========================
  // BUSCAR CATEGORIAS
  // =========================
  useEffect(() => {
    async function carregarCategorias() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/categorias"
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar categorias");
        }

        const data = await response.json();

        setCategorias(data);
      } catch (error) {
        console.error(error);

        setMensagem(
          "Não foi possível carregar as categorias."
        );
      } finally {
        setCarregandoCategorias(false);
      }
    }

    carregarCategorias();
  }, []);

  // =========================
  // CADASTRAR PRODUTO
  // =========================
  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setCarregando(true);
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
        throw new Error(
          "Informe um preço válido."
        );
      }

      // =========================
      // VALIDAR IMAGEM
      // =========================
      if (!imagem) {
        throw new Error(
          "Selecione uma imagem para o produto."
        );
      }

      if (imagem.size > 5 * 1024 * 1024) {
        throw new Error(
          "A imagem deve ter no máximo 5 MB."
        );
      }

      // =========================
      // FORM DATA
      // =========================
      const formData = new FormData();

      formData.append("nome", nome);
      formData.append("descricao", descricao);
      formData.append(
        "preco",
        String(precoNumerico)
      );
      formData.append(
        "categoriaId",
        categoriaId
      );
      formData.append("imagem", imagem);

      // =========================
      // NOVOS CAMPOS
      // =========================
      formData.append(
        "destaque",
        String(destaque)
      );

      formData.append(
        "ativo",
        String(ativo)
      );

      // =========================
      // ENVIO
      // =========================
      const response = await fetch(
        "http://localhost:3001/api/produtos",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.erro ||
            "Erro ao cadastrar produto."
        );
      }

      // =========================
      // SUCESSO
      // =========================
      setMensagem(
        "Produto cadastrado com sucesso!"
      );

      setSucesso(true);

      // Limpar formulário
      setNome("");
      setDescricao("");
      setPreco("");
      setImagem(null);
      setCategoriaId("");

      // Valores padrão
      setDestaque(false);
      setAtivo(true);

      // Limpar campo de arquivo
      const inputImagem =
        document.getElementById(
          "imagem"
        ) as HTMLInputElement | null;

      if (inputImagem) {
        inputImagem.value = "";
      }
    } catch (error) {
      console.error(error);

      setMensagem(
        error instanceof Error
          ? error.message
          : "Não foi possível cadastrar o produto."
      );

      setSucesso(false);
    } finally {
      setCarregando(false);
    }
  }

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
              Novo produto
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
          FORMULÁRIO
      ========================== */}
      <section className="px-6 py-10">

        <div className="mx-auto max-w-3xl">

          <div className="mb-8">

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Produtos
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
              Cadastrar produto
            </h2>

            <p className="mt-2 text-gray-600">
              Preencha os dados do novo produto da vitrine.
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
                placeholder="Ex.: Brinco Dourado"
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
                placeholder="Descreva o produto..."
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

              {/* PREÇO */}
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

              {/* CATEGORIA */}
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
                    setCategoriaId(
                      event.target.value
                    )
                  }
                  required
                  disabled={carregandoCategorias}
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
                    disabled:cursor-not-allowed
                    disabled:bg-gray-100
                  "
                >

                  <option value="">
                    {carregandoCategorias
                      ? "Carregando categorias..."
                      : "Selecione uma categoria"}
                  </option>

                  {categorias.map(
                    (categoria) => (
                      <option
                        key={categoria.id}
                        value={categoria.id}
                      >
                        {categoria.nome}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>

            {/* =========================
                IMAGEM
            ========================== */}
            <div className="mt-6">

              <label
                htmlFor="imagem"
                className="text-sm font-semibold text-gray-900"
              >
                Imagem do produto
              </label>

              <input
                id="imagem"
                type="file"
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                onChange={(event) => {
                  const arquivo =
                    event.target.files?.[0] ||
                    null;

                  setImagem(arquivo);
                }}
                required
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

              {imagem && (
                <p className="mt-2 text-sm text-gray-600">
                  Arquivo selecionado:{" "}
                  <span className="font-semibold text-gray-900">
                    {imagem.name}
                  </span>
                </p>
              )}

              <p className="mt-2 text-xs text-gray-500">
                JPG, JPEG, PNG ou WEBP. Tamanho máximo: 5 MB.
              </p>

            </div>

            {/* =========================
                STATUS DO PRODUTO
            ========================== */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">

              <h3 className="text-sm font-semibold text-gray-900">
                Configurações do produto
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Defina como o produto aparecerá na vitrine.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                {/* DESTAQUE */}
                <label
                  className="
                    flex
                    cursor-pointer
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-4
                    transition
                    hover:border-gray-400
                  "
                >
                  <input
                    type="checkbox"
                    checked={destaque}
                    onChange={(event) =>
                      setDestaque(
                        event.target.checked
                      )
                    }
                    className="
                      mt-1
                      h-4
                      w-4
                      cursor-pointer
                      rounded
                      border-gray-300
                      accent-gray-950
                    "
                  />

                  <div>
                    <span className="block text-sm font-semibold text-gray-900">
                      ★ Produto em destaque
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-gray-500">
                      Aparecerá na seção de produtos em destaque da página principal.
                    </span>
                  </div>
                </label>

                {/* ATIVO */}
                <label
                  className="
                    flex
                    cursor-pointer
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-4
                    transition
                    hover:border-gray-400
                  "
                >
                  <input
                    type="checkbox"
                    checked={ativo}
                    onChange={(event) =>
                      setAtivo(
                        event.target.checked
                      )
                    }
                    className="
                      mt-1
                      h-4
                      w-4
                      cursor-pointer
                      rounded
                      border-gray-300
                      accent-gray-950
                    "
                  />

                  <div>
                    <span className="block text-sm font-semibold text-gray-900">
                      ✓ Produto ativo
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-gray-500">
                      O produto ficará disponível na vitrine.
                    </span>
                  </div>
                </label>

              </div>

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
                disabled={
                  carregando ||
                  carregandoCategorias
                }
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
                {carregando
                  ? "Cadastrando..."
                  : "Cadastrar produto"}
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


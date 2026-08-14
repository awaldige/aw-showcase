"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const USUARIO_PADRAO = "admin";
const SENHA_PADRAO = "1234";

const CHAVE_USUARIO = "aw_admin_usuario";
const CHAVE_SENHA = "aw_admin_senha";

export default function AlterarUsuarioPage() {
  const router = useRouter();

  const [usuarioAtual, setUsuarioAtual] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novoUsuario, setNovoUsuario] = useState("");
  const [confirmarUsuario, setConfirmarUsuario] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("aw_admin_auth");

    if (auth !== "true") {
      router.replace("/admin/login");
      return;
    }

    const usuarioSalvo =
      localStorage.getItem(CHAVE_USUARIO) || USUARIO_PADRAO;

    setUsuarioAtual(usuarioSalvo);
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setSucesso("");

    const usuarioSalvo =
      localStorage.getItem(CHAVE_USUARIO) || USUARIO_PADRAO;

    const senhaSalva =
      localStorage.getItem(CHAVE_SENHA) || SENHA_PADRAO;

    const usuarioNovo = novoUsuario.trim();
    const senhaDigitada = senhaAtual.trim();

    if (senhaDigitada !== senhaSalva) {
      setErro("A senha atual está incorreta.");
      return;
    }

    if (usuarioNovo.length < 3) {
      setErro("O novo usuário deve ter pelo menos 3 caracteres.");
      return;
    }

    if (usuarioNovo !== confirmarUsuario.trim()) {
      setErro("A confirmação do novo usuário não confere.");
      return;
    }

    if (usuarioNovo === usuarioSalvo) {
      setErro("O novo usuário deve ser diferente do usuário atual.");
      return;
    }

    setCarregando(true);

    localStorage.setItem(CHAVE_USUARIO, usuarioNovo);

    setUsuarioAtual(usuarioNovo);
    setSenhaAtual("");
    setNovoUsuario("");
    setConfirmarUsuario("");

    setSucesso("Usuário alterado com sucesso!");

    setCarregando(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md">

        {/* Marca */}
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            AW Showcase
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
            Alterar usuário
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Atualize o usuário de acesso administrativo.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          {/* Usuário atual */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Usuário atual
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {usuarioAtual || "admin"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Senha atual */}
            <div>
              <label
                htmlFor="senhaAtual"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Senha atual
              </label>

              <input
                id="senhaAtual"
                type="password"
                value={senhaAtual}
                onChange={(event) =>
                  setSenhaAtual(event.target.value)
                }
                placeholder="Digite sua senha atual"
                autoComplete="current-password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-gray-950
                  focus:ring-2
                  focus:ring-gray-950/10
                "
                required
              />
            </div>

            {/* Novo usuário */}
            <div>
              <label
                htmlFor="novoUsuario"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Novo usuário
              </label>

              <input
                id="novoUsuario"
                type="text"
                value={novoUsuario}
                onChange={(event) =>
                  setNovoUsuario(event.target.value)
                }
                placeholder="Digite o novo usuário"
                autoComplete="username"
                minLength={3}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-gray-950
                  focus:ring-2
                  focus:ring-gray-950/10
                "
                required
              />

              <p className="mt-2 text-xs text-gray-500">
                Mínimo de 3 caracteres.
              </p>
            </div>

            {/* Confirmar usuário */}
            <div>
              <label
                htmlFor="confirmarUsuario"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirmar novo usuário
              </label>

              <input
                id="confirmarUsuario"
                type="text"
                value={confirmarUsuario}
                onChange={(event) =>
                  setConfirmarUsuario(event.target.value)
                }
                placeholder="Digite novamente o novo usuário"
                autoComplete="username"
                minLength={3}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-gray-950
                  focus:ring-2
                  focus:ring-gray-950/10
                "
                required
              />
            </div>

            {/* Erro */}
            {erro && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-600">
                  {erro}
                </p>
              </div>
            )}

            {/* Sucesso */}
            {sucesso && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-sm font-medium text-green-700">
                  {sucesso}
                </p>
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={carregando}
              className="
                w-full
                rounded-xl
                bg-gray-950
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-gray-800
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {carregando ? "Salvando..." : "Alterar usuário"}
            </button>
          </form>

          {/* Voltar */}
          <div className="mt-6 text-center">
            <Link
              href="/admin"
              className="
                text-sm
                font-medium
                text-gray-500
                transition
                hover:text-gray-950
              "
            >
              ← Voltar para o painel
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SENHA_PADRAO = "1234";
const CHAVE_SENHA = "aw_admin_senha";

export default function AlterarSenhaPage() {
  const router = useRouter();

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("aw_admin_auth");

    if (auth !== "true") {
      router.replace("/admin/login");
    }
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setSucesso("");

    const senhaSalva =
      localStorage.getItem(CHAVE_SENHA) || SENHA_PADRAO;

    if (senhaAtual !== senhaSalva) {
      setErro("A senha atual está incorreta.");
      return;
    }

    if (novaSenha.length < 4) {
      setErro("A nova senha deve ter pelo menos 4 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("A confirmação da nova senha não confere.");
      return;
    }

    if (novaSenha === senhaAtual) {
      setErro("A nova senha deve ser diferente da senha atual.");
      return;
    }

    setCarregando(true);

    localStorage.setItem(CHAVE_SENHA, novaSenha);

    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");

    setSucesso("Senha alterada com sucesso!");

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
            Alterar senha
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Atualize a senha de acesso administrativo.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

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
                placeholder="Digite a senha atual"
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

            {/* Nova senha */}
            <div>
              <label
                htmlFor="novaSenha"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nova senha
              </label>

              <input
                id="novaSenha"
                type="password"
                value={novaSenha}
                onChange={(event) =>
                  setNovaSenha(event.target.value)
                }
                placeholder="Digite a nova senha"
                autoComplete="new-password"
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
                Mínimo de 4 caracteres.
              </p>
            </div>

            {/* Confirmar senha */}
            <div>
              <label
                htmlFor="confirmarSenha"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirmar nova senha
              </label>

              <input
                id="confirmarSenha"
                type="password"
                value={confirmarSenha}
                onChange={(event) =>
                  setConfirmarSenha(event.target.value)
                }
                placeholder="Digite novamente a nova senha"
                autoComplete="new-password"
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
              {carregando ? "Salvando..." : "Alterar senha"}
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
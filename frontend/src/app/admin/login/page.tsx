"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const USUARIO_PADRAO = "admin";
const SENHA_PADRAO = "1234";

const CHAVE_USUARIO = "aw_admin_usuario";
const CHAVE_SENHA = "aw_admin_senha";

export default function AdminLoginPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    const usuarioDigitado = usuario.trim();
    const senhaDigitada = senha.trim();

    // Recupera usuário personalizado.
    // Se ainda não existir, utiliza "admin".
    const usuarioSalvo =
      localStorage.getItem(CHAVE_USUARIO) || USUARIO_PADRAO;

    // Recupera senha personalizada.
    // Se ainda não existir, utiliza "1234".
    const senhaSalva =
      localStorage.getItem(CHAVE_SENHA) || SENHA_PADRAO;

    if (
      usuarioDigitado === usuarioSalvo &&
      senhaDigitada === senhaSalva
    ) {
      sessionStorage.setItem("aw_admin_auth", "true");

      router.push("/admin");
      return;
    }

    setErro("Usuário ou senha incorretos.");
    setCarregando(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md">

        {/* Logo / Marca */}
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            AW Showcase
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
            Área administrativa
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Entre para gerenciar sua vitrine.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Usuário */}
            <div>
              <label
                htmlFor="usuario"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Usuário
              </label>

              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
                placeholder="Digite seu usuário"
                autoComplete="username"
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

            {/* Senha */}
            <div>
              <label
                htmlFor="senha"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Senha
              </label>

              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="Digite sua senha"
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

            {/* Erro */}
            {erro && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-600">
                  {erro}
                </p>
              </div>
            )}

            {/* Entrar */}
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
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Esqueci minha senha */}
          <div className="mt-6 text-center">
            <Link
              href="/admin/esqueci-senha"
              className="
                text-sm
                font-medium
                text-gray-500
                transition
                hover:text-gray-950
              "
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>

        {/* Voltar */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="
              text-sm
              font-medium
              text-gray-500
              transition
              hover:text-gray-950
            "
          >
            ← Voltar para a vitrine
          </Link>
        </div>

      </div>
    </main>
  );
}
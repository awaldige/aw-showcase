"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* =========================
            LOGO
        ========================== */}
        <Link
          href="/"
          onClick={fecharMenu}
          className="group flex items-center gap-3"
        >
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full bg-gray-950
              text-sm font-bold text-white
              transition duration-300
              group-hover:scale-105
            "
          >
            AW
          </div>

          <div className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-gray-950">
              AW Showcase
            </span>

            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 sm:block">
              Acessórios & Estilo
            </span>
          </div>
        </Link>

        {/* =========================
            MENU DESKTOP
        ========================== */}
        <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            Início
          </Link>

          <Link
            href="/#categorias"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            Categorias
          </Link>

          <Link
            href="/#produtos"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            Produtos
          </Link>

          <Link
            href="/#contato"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            Contato
          </Link>

        </nav>

        {/* =========================
            BOTÃO MOBILE
        ========================== */}
        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            text-gray-900
            transition
            hover:bg-gray-100
            md:hidden
          "
        >
          <span className="text-xl">
            {menuAberto ? "✕" : "☰"}
          </span>
        </button>

      </div>

      {/* =========================
          MENU MOBILE
      ========================== */}
      {menuAberto && (
        <div className="border-t border-gray-200 bg-white md:hidden">

          <nav className="mx-auto max-w-7xl px-6 py-5">

            <div className="flex flex-col">

              <Link
                href="/"
                onClick={fecharMenu}
                className="
                  border-b border-gray-100
                  py-4
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:text-gray-950
                "
              >
                🏠 Início
              </Link>

              <Link
                href="/#categorias"
                onClick={fecharMenu}
                className="
                  border-b border-gray-100
                  py-4
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:text-gray-950
                "
              >
                ✦ Categorias
              </Link>

              <Link
                href="/#produtos"
                onClick={fecharMenu}
                className="
                  border-b border-gray-100
                  py-4
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:text-gray-950
                "
              >
                ◇ Produtos
              </Link>

              <Link
                href="/#contato"
                onClick={fecharMenu}
                className="
                  border-b border-gray-100
                  py-4
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:text-gray-950
                "
              >
                ✉ Contato
              </Link>

            </div>

          </nav>

        </div>
      )}

    </header>
  );
}
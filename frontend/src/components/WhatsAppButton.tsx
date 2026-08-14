"use client";

interface WhatsAppButtonProps {
  mensagem?: string;
}

function WhatsAppIcon({
  size = 28,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16 3C8.82 3 3 8.82 3 16c0 2.29.6 4.44 1.65 6.3L3 29l6.9-1.61A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm0 23.8c-2.02 0-3.9-.58-5.49-1.58l-.39-.24-4.09.95.97-3.98-.26-.41A10.76 10.76 0 0 1 5.2 16C5.2 10.04 10.04 5.2 16 5.2S26.8 10.04 26.8 16 21.96 26.8 16 26.8Z" />

      <path d="M22.37 18.42c-.35-.18-2.08-1.03-2.4-1.15-.32-.12-.55-.18-.78.18-.23.35-.9 1.15-1.1 1.38-.2.23-.4.26-.75.09-.35-.18-1.47-.54-2.8-1.73-1.03-.92-1.73-2.06-1.93-2.41-.2-.35-.02-.54.15-.72.16-.16.35-.4.53-.6.18-.2.23-.35.35-.58.12-.23.06-.43-.03-.61-.09-.18-.78-1.87-1.07-2.56-.28-.67-.57-.58-.78-.59h-.66c-.23 0-.61.09-.93.43-.32.35-1.22 1.19-1.22 2.9s1.25 3.37 1.43 3.6c.18.23 2.46 3.76 5.96 5.27.83.36 1.48.57 1.99.73.84.27 1.61.23 2.22.14.68-.1 2.08-.85 2.37-1.67.29-.82.29-1.52.2-1.67-.09-.15-.32-.24-.67-.42Z" />
    </svg>
  );
}

export default function WhatsAppButton({
  mensagem = "Olá! Gostaria de saber mais sobre os produtos da AW Showcase.",
}: WhatsAppButtonProps) {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!numero) {
    return null;
  }

  const mensagemCodificada = encodeURIComponent(mensagem);

  const url = `https://wa.me/${numero}?text=${mensagemCodificada}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a AW Showcase pelo WhatsApp"
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
        bg-green-500
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:scale-110
        hover:bg-green-600
        hover:shadow-xl
      "
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
export function gerarLinkWhatsApp(mensagem: string) {
  const numero = "5511985878638";

  const texto = encodeURIComponent(mensagem);

  return `https://wa.me/${numero}?text=${texto}`;
}
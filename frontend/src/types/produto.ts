export interface Categoria {
  id: number;
  nome: string;
}


export interface Produto {
  id: number;
  nome: string;
  descricao: string | null;
  preco: string;
  imagem: string | null;
  destaque: boolean;
  ativo: boolean;
  categoriaId: number;
  categoria: Categoria;
}
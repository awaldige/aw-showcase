const API_URL = "http://localhost:3001/api";

// =========================
// LISTAR PRODUTOS
// =========================

export async function getProdutos() {
  const response = await fetch(`${API_URL}/produtos`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const texto = await response.text();

    console.error("ERRO AO BUSCAR PRODUTOS:", {
      status: response.status,
      resposta: texto,
    });

    throw new Error(
      `Erro ao buscar produtos (${response.status})`
    );
  }

  return response.json();
}

// =========================
// BUSCAR PRODUTO POR ID
// =========================

export async function getProdutoById(
  id: string | number
) {
  const url = `${API_URL}/produtos/${id}`;

  console.log("BUSCANDO PRODUTO:", url);

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    const texto = await response.text();

    console.error("ERRO AO BUSCAR PRODUTO:", {
      id,
      url,
      status: response.status,
      resposta: texto,
    });

    if (response.status === 404) {
      return null;
    }

    throw new Error(
      `Erro ao buscar produto (${response.status})`
    );
  }

  return response.json();
}

// =========================
// LISTAR CATEGORIAS
// =========================

export async function getCategorias() {
  const response = await fetch(
    `${API_URL}/categorias`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const texto = await response.text();

    console.error("ERRO AO BUSCAR CATEGORIAS:", {
      status: response.status,
      resposta: texto,
    });

    throw new Error(
      `Erro ao buscar categorias (${response.status})`
    );
  }

  return response.json();
}

// =========================
// EXCLUIR PRODUTO
// =========================

export async function excluirProduto(
  id: string | number
) {
  const response = await fetch(
    `${API_URL}/produtos/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.erro || "Erro ao excluir produto"
    );
  }

  return data;
}

// =========================
// ATUALIZAR PRODUTO
// =========================

export async function atualizarProduto(
  id: string | number,
  dados: {
    nome: string;
    descricao: string;
    preco: number;
    categoriaId: number;
    imagem?: File | null;
    destaque?: boolean;
    ativo?: boolean;
  }
) {
  const formData = new FormData();

  // =========================
  // DADOS DO PRODUTO
  // =========================

  formData.append("nome", dados.nome);

  formData.append(
    "descricao",
    dados.descricao || ""
  );

  formData.append(
    "preco",
    String(dados.preco)
  );

  formData.append(
    "categoriaId",
    String(dados.categoriaId)
  );

  // =========================
  // DESTAQUE
  // =========================

  formData.append(
    "destaque",
    String(dados.destaque === true)
  );

  // =========================
  // ATIVO
  // =========================

  formData.append(
    "ativo",
    String(
      dados.ativo === undefined
        ? true
        : dados.ativo
    )
  );

  // =========================
  // NOVA IMAGEM
  // =========================

  if (dados.imagem) {
    formData.append(
      "imagem",
      dados.imagem
    );
  }

  // =========================
  // ENVIO
  // =========================

  const response = await fetch(
    `${API_URL}/produtos/${id}`,
    {
      method: "PUT",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.erro ||
        "Erro ao atualizar produto"
    );
  }

  return data;
}
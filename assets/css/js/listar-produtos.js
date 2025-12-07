let produtosCache = []; // para acessar o produto depois no modal

function carregarProdutos(categoria, containerId) {
  fetch('../back/produtos.json')
    .then(r => r.json())
    .then(produtos => {
      produtosCache = produtos; // guarda todos para uso no modal

      const produtosFiltrados = produtos.filter(p => p.categoria === categoria);
      const container = document.getElementById(containerId);
      container.innerHTML = "";

      produtosFiltrados.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.produtoId = p.id; // salva o id no DOM

        card.innerHTML = `
          <div class="product-media">
            <img src="${p.imagem}" alt="${p.nome}">
          </div>
          <h3>${p.nome}</h3>
          <p class="price">R$ ${p.preco.toFixed(2).replace('.', ',')}</p>
        `;

        // evento de clique na imagem (pode ser no card inteiro se preferir)
        const img = card.querySelector('.product-media img');
        img.addEventListener('click', () => {
          abrirModalProduto(p.id);
        });

        container.appendChild(card);
      });
    })
    .catch(err => console.error("Erro ao carregar produtos:", err));
}

function abrirModalProduto(id) {
  const produto = produtosCache.find(p => p.id === id);
  if (!produto) return;

  // Preencher modal
  document.getElementById("modal-img").src = produto.imagem;
  document.getElementById("modal-img").alt = produto.nome;

  document.getElementById("modal-nome").textContent = produto.nome;

  document.getElementById("modal-preco").textContent =
    "R$ " + produto.preco.toFixed(2).replace('.', ',');

  // Descrição
  const descList = document.getElementById("modal-desc");
  descList.innerHTML = "";

  if (produto.descricao && Array.isArray(produto.descricao)) {
    produto.descricao.forEach(texto => {
      const li = document.createElement("li");
      li.textContent = texto;
      descList.appendChild(li);
    });
  }

  document.getElementById("product-modal").classList.add("is-open");
}

// fechar modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('product-modal');
  const btnClose = document.getElementById('product-modal-close');
  const backdrop = document.querySelector('.product-modal-backdrop');

  function fecharModal() {
    modal.classList.remove('is-open');
  }

  btnClose.addEventListener('click', fecharModal);
  backdrop.addEventListener('click', fecharModal);

  // tecla ESC fecha modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharModal();
  });
});

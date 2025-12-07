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

function abrirModalProduto(produtoId) {
  const produto = produtosCache.find(p => p.id === produtoId);
  if (!produto) return;

  const modal = document.getElementById('product-modal');
  const imgEl = document.getElementById('modal-produto-imagem');
  const nomeEl = document.getElementById('modal-produto-nome');
  const precoEl = document.getElementById('modal-produto-preco');
  const descListEl = document.getElementById('modal-produto-descricao');

  imgEl.src = produto.imagem;
  imgEl.alt = produto.nome;
  nomeEl.textContent = produto.nome;
  precoEl.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;

  // limpa descrição
  descListEl.innerHTML = "";

  // se descricao é array (como combinamos)
  if (Array.isArray(produto.descricao)) {
    produto.descricao.forEach(texto => {
      const li = document.createElement('li');
      li.textContent = texto;
      descListEl.appendChild(li);
    });
  } else if (typeof produto.descricao_curta === 'string') {
    const li = document.createElement('li');
    li.textContent = produto.descricao_curta;
    descListEl.appendChild(li);
  }

  // você pode ligar os botões a um carrinho depois
  const btnComprar = document.getElementById('btn-comprar');
  const btnAddCarrinho = document.getElementById('btn-add-carrinho');

  btnComprar.onclick = () => {
    alert(`Comprar agora: ${produto.nome}`);
    // aqui depois você pode redirecionar para checkout, etc.
  };

  btnAddCarrinho.onclick = () => {
    alert(`Produto adicionado ao carrinho: ${produto.nome}`);
    // aqui depois você pode chamar uma função addAoCarrinho(produto)
  };

  modal.classList.add('is-open');
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

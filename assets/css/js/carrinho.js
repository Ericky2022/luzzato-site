let carrinho = [];

function carregarCarrinho() {
  const salvo = localStorage.getItem('carrinho');
  carrinho = salvo ? JSON.parse(salvo) : [];
}

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function addAoCarrinho(produto, quantidade = 1) {
  const itemExistente = carrinho.find(item => item.id === produto.id);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade
    });
  }

  salvarCarrinho();
  atualizarIconeCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  salvarCarrinho();
  atualizarIconeCarrinho();
}

function atualizarIconeCarrinho() {
  const el = document.getElementById('carrinho-contador');
  if (!el) return;
  const totalQtd = carrinho.reduce((s, item) => s + item.quantidade, 0);
  el.textContent = totalQtd;
}

document.addEventListener('DOMContentLoaded', () => {
  carregarCarrinho();
  atualizarIconeCarrinho();
});
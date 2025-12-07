let produtosCache = []; // para acessar o produto depois no modal

function carregarProdutos(categoria, containerId) {
  fetch("../back/produtos.json")
    .then((r) => r.json())
    .then((produtos) => {
      produtosCache = produtos; // guarda todos para uso no modal

      const produtosFiltrados = produtos.filter(
        (p) => p.categoria === categoria
      );
      const container = document.getElementById(containerId);
      container.innerHTML = "";

      produtosFiltrados.forEach((p) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.produtoId = p.id; // salva o id no DOM

        card.innerHTML = `
          <div class="product-media">
            <img src="${p.imagem}" alt="${p.nome}">
          </div>
          <h3>${p.nome}</h3>
          <p class="price">R$ ${p.preco.toFixed(2).replace(".", ",")}</p>
        `;

        // evento de clique no container da imagem
        const productMedia = card.querySelector(".product-media");
        productMedia.addEventListener("click", () => {
          abrirModalProduto(p.id);
        });

        container.appendChild(card);
      });
    })
    .catch((err) => console.error("Erro ao carregar produtos:", err));
}

function abrirModalProduto(id) {
  const produto = produtosCache.find((p) => p.id === id);
  if (!produto) return;

  // Preencher modal
  document.getElementById("modal-img").src = produto.imagem;
  document.getElementById("modal-img").alt = produto.nome;

  document.getElementById("modal-nome").textContent = produto.nome;

  document.getElementById("modal-preco").textContent =
    "R$ " + produto.preco.toFixed(2).replace(".", ",");

  // Descrição
  const descList = document.getElementById("modal-desc");
  descList.innerHTML = "";

  if (produto.descricao && Array.isArray(produto.descricao)) {
    produto.descricao.forEach((texto) => {
      const li = document.createElement("li");
      li.textContent = texto;
      descList.appendChild(li);
    });
  }

  // Abre o modal e bloqueia scroll
  const modal = document.getElementById("product-modal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // bloqueia scroll da página

  const btnComprar = document.getElementById('btn-comprar');
  const btnCarrinho = document.getElementById('btn-carrinho');

  btnCarrinho.onclick = () => {
    addAoCarrinho(produto, 1);
    alert('Produto adicionado ao carrinho!');
  };

  btnComprar.onclick = () => {
    addAoCarrinho(produto, 1);
    window.location.href = 'carrinho.html'; // vai para página do carrinho
  };

  document.getElementById('product-modal').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

// fechar modal
function fecharModal() {
  const modal = document.getElementById("product-modal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // libera scroll
}

document.addEventListener("DOMContentLoaded", () => {
  const btnClose = document.getElementById("modal-close");
  const btnComprar = document.getElementById("btn-comprar");
  const btnCarrinho = document.getElementById("btn-carrinho");

  // Botão X fecha o modal
  if (btnClose) {
    btnClose.addEventListener("click", fecharModal);
  }

  // Botão COMPRAR fecha o modal (e pode redirecionar para checkout)
  if (btnComprar) {
    btnComprar.addEventListener("click", () => {
      fecharModal();
      // ADICIONE AQUI: redirecionar para página de checkout ou processar compra
      console.log("Comprar produto");
    });
  }

  // Botão ADICIONAR AO CARRINHO fecha o modal (e adiciona ao carrinho)
  if (btnCarrinho) {
    btnCarrinho.addEventListener("click", () => {
      fecharModal();
      // ADICIONE AQUI: lógica para adicionar ao carrinho
      console.log("Adicionado ao carrinho");
    });
  }

  // Tecla ESC fecha o modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById("product-modal");
      if (modal && modal.classList.contains("is-open")) {
        fecharModal();
      }
    }
  });

  // REMOVIDO: backdrop não fecha mais o modal ao clicar fora
});

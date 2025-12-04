// Atualiza o ano automaticamente no footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Aqui depois podemos adicionar:
// - Scroll suave
// - Menu mobile
// - Interações sofisticadas

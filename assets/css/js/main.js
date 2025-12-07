// Atualiza o ano automaticamente no footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// SCROLL SUAVE PARA LINKS ÂNCORA
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId.length > 1) {
      // e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
          behavior: "smooth",
        });
      }
    }
  });
});

// ANIMAÇÃO DE ENTRADA COM INTERSECTION OBSERVER
const animatedElements = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: se não tiver IntersectionObserver, mostra tudo
  animatedElements.forEach((el) => el.classList.add("is-visible"));
}

document.addEventListener("DOMContentLoaded", () => {
  // Suporte para ambos os menus (antigo e novo)
  const toggle =
    document.querySelector(".menu-toggle") ||
    document.querySelector(".btn-menu");
  const nav =
    document.querySelector(".main-nav") || document.querySelector(".nav");
  const overlay =
    document.getElementById("menuOverlay") ||
    document.querySelector(".menu-overlay");

  if (!toggle || !nav) return;

  // Criar overlay dinamicamente se não existir
  let overlayElement = overlay;
  if (!overlayElement) {
    overlayElement = document.createElement("div");
    overlayElement.classList.add("menu-overlay");
    overlayElement.id = "menuOverlay";
    document.body.appendChild(overlayElement);
  }

  const closeMenu = () => {
    nav.classList.remove("nav-open", "active");
    toggle.classList.remove("is-active");
    document.body.classList.remove("menu-open");
    overlayElement.classList.remove("active");
  };

  toggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    nav.classList.toggle("active");
    toggle.classList.toggle("is-active");
    document.body.classList.toggle("menu-open");
    overlayElement.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  overlayElement.addEventListener("click", closeMenu);
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");
  const links = menu.querySelectorAll("a");
  const overlay = document.querySelector(".menu-overlay");

  // abre / fecha o menu
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    overlay.classList.toggle("active");
  });

  // ao clicar em um link: só fecha o menu
  // (NÃO usa preventDefault – o link navega normalmente)
  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      overlay.classList.remove("active");
      // sem preventDefault aqui
    });
  });

  // clicar fora fecha também
  overlay.addEventListener("click", () => {
    menu.classList.remove("open");
    overlay.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".promo-carousel-track");
    const cards = Array.from(document.querySelectorAll(".promo-card"));
    const prevBtn = document.querySelector(".promo-prev");
    const nextBtn = document.querySelector(".promo-next");
    const dotsContainer = document.querySelector(".promo-dots");

    if (!track || cards.length === 0) return;

    // Quantidade de cards visíveis (desktop)
    function getVisibleCards() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    let currentIndex = 0;
    let visibleCards = getVisibleCards();

    // Cria dots com base no número de "páginas"
    function createDots() {
      dotsContainer.innerHTML = "";
      visibleCards = getVisibleCards();
      const totalPages = Math.ceil(cards.length / visibleCards);

      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("span");
        dot.classList.add("promo-dot");
        if (i === 0) dot.classList.add("active");
        dot.dataset.index = i;
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateActiveDot() {
      const dots = dotsContainer.querySelectorAll(".promo-dot");
      dots.forEach(dot => dot.classList.remove("active"));
      const pageIndex = Math.floor(currentIndex / visibleCards);
      if (dots[pageIndex]) dots[pageIndex].classList.add("active");
    }

    function goToSlide(pageIndex) {
      visibleCards = getVisibleCards();
      const maxIndex = cards.length - visibleCards;
      currentIndex = Math.min(pageIndex * visibleCards, maxIndex);
      const cardWidth = cards[0].offsetWidth + 16; // largura + margin
      track.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth"
      });
      updateActiveDot();
    }

    function next() {
      visibleCards = getVisibleCards();
      const maxIndex = cards.length - visibleCards;
      if (currentIndex < maxIndex) {
        currentIndex += visibleCards;
      } else {
        currentIndex = 0; // volta ao início
      }
      goToSlide(Math.floor(currentIndex / visibleCards));
    }

    function prev() {
      visibleCards = getVisibleCards();
      const maxIndex = cards.length - visibleCards;
      if (currentIndex > 0) {
        currentIndex -= visibleCards;
      } else {
        currentIndex = maxIndex;
      }
      goToSlide(Math.floor(currentIndex / visibleCards));
    }

    createDots();

    nextBtn && nextBtn.addEventListener("click", next);
    prevBtn && prevBtn.addEventListener("click", prev);

    window.addEventListener("resize", () => {
      // Recria os dots e realinha o carrossel quando mudar o tamanho da tela
      createDots();
      goToSlide(0);
    });
  });
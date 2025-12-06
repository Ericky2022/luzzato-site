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

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
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggle || !nav) return;

  // Criar overlay dinamicamente
  const overlay = document.createElement("div");
  overlay.classList.add("menu-overlay");
  document.body.appendChild(overlay);

  const closeMenu = () => {
    nav.classList.remove("nav-open");
    toggle.classList.remove("is-active");
    document.body.classList.remove("menu-open");
    overlay.classList.remove("active");
  };

  toggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    toggle.classList.toggle("is-active");
    document.body.classList.toggle("menu-open");
    overlay.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  overlay.addEventListener("click", closeMenu);
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu   = document.querySelector(".mobile-menu");
  const links  = menu.querySelectorAll("a");
  const overlay = document.querySelector(".menu-overlay");

  // abre / fecha o menu
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    overlay.classList.toggle("active");
  });

  // ao clicar em um link: só fecha o menu
  // (NÃO usa preventDefault – o link navega normalmente)
  links.forEach(link => {
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

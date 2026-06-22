/* ============================================================
   CONTACT - 
   The address is assembled in the browser, so it never appears
   as plain text in the page source (light protection against
   scraper bots).
   ============================================================ */
const EMAIL_USER   = "jaenai.rugengande-ihimbazwe";
const EMAIL_DOMAIN = "etu.unistra.fr"; 
const EMAIL = EMAIL_USER + "@" + EMAIL_DOMAIN;

function openEmail() { window.location.href = "mailto:" + EMAIL; }

/* Footer year (every page) */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* "Email me" button in the home hero */
const heroEmail = document.getElementById("email-btn");
if (heroEmail) heroEmail.addEventListener("click", openEmail);

/* Contact page: reveal-then-open + copy */
const emailText = document.getElementById("email-text");
const emailBtn2 = document.getElementById("email-btn-2");
let emailRevealed = false;

if (emailBtn2) {
  emailBtn2.addEventListener("click", function () {
    if (!emailRevealed && emailText) { emailText.textContent = EMAIL; emailRevealed = true; }
    else openEmail();
  });
}

const copyBtn = document.getElementById("copy-btn");
if (copyBtn) {
  copyBtn.addEventListener("click", async function () {
    try { await navigator.clipboard.writeText(EMAIL); } catch (e) {}
    if (emailText) { emailText.textContent = EMAIL; emailRevealed = true; }
    const c = document.getElementById("copied");
    if (c) { c.classList.add("show"); setTimeout(() => c.classList.remove("show"), 1600); }
  });
}

/* Projects page: clickable list → detail panel */
const projItems = document.querySelectorAll(".project-list__item");
if (projItems.length) {
  const panes = document.querySelectorAll(".project-pane");
  function selectProject(id) {
    projItems.forEach(function (b) {
      const on = b.getAttribute("data-target") === id;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    panes.forEach(function (p) { p.classList.toggle("active", p.id === id); });
  }
  projItems.forEach(function (b) {
    b.addEventListener("click", function () {
      const id = b.getAttribute("data-target");
      selectProject(id);
      if (window.matchMedia("(max-width: 820px)").matches) {
        const pane = document.getElementById(id);
        if (pane) pane.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
  projItems.forEach(function (b, i) {
    b.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); projItems[(i + 1) % projItems.length].focus(); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); projItems[(i - 1 + projItems.length) % projItems.length].focus(); }
    });
  });
}

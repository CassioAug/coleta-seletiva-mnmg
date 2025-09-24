// Voltar ao topo
const topBtn = document.getElementById("topBtn");
window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

topBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Menu toggle para mobile
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", function () {
  menu.classList.toggle("menu-visible");
});

// Mapa Interativo com Leaflet.js
// 1. Inicializando o mapa, definindo coordenadas e zoom.
const map = L.map("mapa").setView([-18.611, -45.361], 14);

// 2. Adicionando "tile layer" com OpenStreetMap.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// 3. Adicionando marcadores de exemplo.
const ponto1 = L.marker([-18.606978, -45.3474]).addTo(map);
ponto1.bindPopup(
  "<b>Ponto de Coleta Voluntário</b><br>Recebe: Plástico e Papelão."
);

const ponto2 = L.marker([-18.609, -45.358]).addTo(map);
ponto2.bindPopup(
  "<b>Ponto de coleta voluntário.</b><br>Recebe: Vidro e Metal."
);

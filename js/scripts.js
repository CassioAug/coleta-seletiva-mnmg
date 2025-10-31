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

const menuToggle = document.querySelector(".navbar-toggler");
const navbarNav = document.querySelector("#navbarNav");

if (menuToggle && navbarNav) {
  menuToggle.addEventListener("click", function () {
    navbarNav.classList.toggle("show");
  });
}

// Mapa Interativo com Leaflet.js

function initMap() {
  // Inicializando o mapa, definindo coordenadas e zoom.
  const map = L.map("mapa").setView([-18.611, -45.361], 14);

  // Adicionando "tile layer" com OpenStreetMap.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Adicionando marcadores a partir do arquivo marcadores.js
  pontosColeta.forEach((ponto) => {
    const marcador = L.marker(ponto.coordenadas).addTo(map);

    // Conteúdo do popup
    const popupContent = `
      <b>${ponto.nome}</b><br>
      <i>${ponto.endereco}</i><br>
      Recebe: ${ponto.materiais.join(", ")}<br>
      Horário: ${ponto.horario}
    `;

    marcador.bindPopup(popupContent);
  });
}

// Inicializando o mapa
document.addEventListener("DOMContentLoaded", initMap);

// Formulário de Voluntários

const form = document.getElementById("volunteer-form");
const statusDiv = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    const json = JSON.stringify(object);

    statusDiv.textContent = "Enviando, por favor aguarde...";
    statusDiv.style.display = "block";
    statusDiv.className = "info";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          statusDiv.textContent = "Obrigado por entrar em contato.";
          statusDiv.className = "success";
        } else {
          console.log(response);
          statusDiv.textContent = json.message;
          statusDiv.className = "error";
        }
      })
      .catch((error) => {
        console.log(error);
        statusDiv.textContent = "Ocorreu um erro ao enviar o formulário.";
        statusDiv.className = "error";
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          statusDiv.style.display = "none";
        }, 6000);
      });
  });
}

// Navegação suave

document.addEventListener("DOMContentLoaded", function () {
  // Para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

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

    statusDiv.textContent = "Enviando, por favor aguarde...";
    statusDiv.style.display = "block";
    statusDiv.className = "info";

    // Coletando dados usando FormData
    const formData = new FormData(form);
    const urlEncodedData = new URLSearchParams(formData).toString();

    const formActionURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSei-pLTwslQSknAgEXQ1j6KOMD-BaiaLfjRHoo9dmC8VjzffQ/formResponse";

    // Criando um formulário temporário
    const tempForm = document.createElement("form");
    tempForm.style.display = "none";
    tempForm.method = "POST";
    tempForm.action = formActionURL;
    tempForm.target = "hiddenIframe";

    for (const [key, value] of formData.entries()) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      tempForm.appendChild(input);
    }

    // iframe oculto para evitar redirecionamento
    let iframe = document.getElementById("hiddenIframe");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.name = "hiddenIframe";
      iframe.id = "hiddenIframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }

    document.body.appendChild(tempForm);
    tempForm.submit();
    document.body.removeChild(tempForm);

    // Confirmação de envio
    setTimeout(() => {
      statusDiv.textContent =
        "Cadastro enviado com sucesso! Muito obrigado pela colaboração.";
      statusDiv.className = "success";
      form.reset();

      setTimeout(() => {
        statusDiv.style.display = "none";
      }, 6000);
    }, 1000);
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

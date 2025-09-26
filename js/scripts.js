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

// Formulário de Voluntários

const form = document.getElementById("volunteer-form");
const statusDiv = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    statusDiv.textContent = "Enviando, por favor aguarde...";
    statusDiv.style.display = "block";
    statusDiv.className = "info";

    // Coletando dados
    const nome = document.querySelector('input[name="entry.1704902272"]');
    const endereco = document.querySelector('input[name="entry.899152083"]');
    const telefone = document.querySelector('input[name="entry.268666988"]');
    const materiais = document.querySelector('input[name="entry.2031907264"]');

    // Verificando se os elementos existem
    if (!nome || !endereco || !telefone || !materiais) {
      statusDiv.textContent = "Erro: Campos do formulário não encontrados.";
      statusDiv.className = "error";
      return;
    }

    const formData = {
      "entry.1704902272": nome.value,
      "entry.899152083": endereco.value,
      "entry.268666988": telefone.value,
      "entry.2031907264": materiais.value,
    };

    console.log("Dados coletados:", formData);

    const urlEncodedData = new URLSearchParams(formData).toString();
    const formActionURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSei-pLTwslQSknAgEXQ1j6KOMD-BaiaLfjRHoo9dmC8VjzffQ/formResponse";

    // CORS e XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open("POST", formActionURL, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        statusDiv.textContent =
          "Cadastro enviado com sucesso! Muito obrigado pela colaboração.";
        statusDiv.className = "success";
        form.reset();

        setTimeout(() => {
          statusDiv.style.display = "none";
        }, 6000);
      }
    };

    xhr.onerror = function () {
      statusDiv.textContent =
        "Ocorreu um erro de rede. Verifique sua conexão e tente novamente.";
      statusDiv.className = "error";

      setTimeout(() => {
        statusDiv.style.display = "none";
      }, 6000);
    };

    xhr.send(urlEncodedData);
  });
}

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

    // Coleta os dados manualmente para garantir que estão corretos
    const formData = {
      "entry.1704902272": document.getElementById("nome").value,
      "entry.899152083": document.getElementById("endereco").value,
      "entry.268666988": document.getElementById("telefone").value,
      "entry.2031907264": document.getElementById("materiais").value,
    };

    const urlEncodedData = new URLSearchParams(formData).toString();

    const formActionURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSei-pLTwslQSknAgEXQ1j6KOMD-BaiaLfjRHoo9dmC8VjzffQ/formResponse";

    // debug log
    console.log("Dados sendo enviados:", formData);
    console.log("URL encoded:", urlEncodedData);

    fetch(formActionURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData,
    })
      .then((response) => {
        if (response.ok) {
          statusDiv.textContent =
            "Cadastro enviado com sucesso! Muito obrigado pela colaboração.";
          statusDiv.className = "success";
          form.reset();
        } else {
          throw new Error("Erro na resposta do servidor");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        statusDiv.textContent =
          "Ocorreu um erro ao enviar seu cadastro. Por favor, tente novamente. Erro: " +
          error.message;
        statusDiv.className = "error";
      })
      .finally(() => {
        setTimeout(() => {
          statusDiv.style.display = "none";
        }, 6000);
      });
  });
}

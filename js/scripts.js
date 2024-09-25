// Voltar ao topo
const topBtn = document.getElementById('topBtn');
window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Menu toggle para mobile
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', function () {
    menu.classList.toggle('menu-visible');
});
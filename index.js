// Aguarda o DOM carregar completamente antes de inicializar o Swiper
document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 4, // Exibe 4 cards por vez
        spaceBetween: 20, // Espaçamento entre os cards
        loop: true, // Ativa rotação infinita
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            1024: { slidesPerView: 4 }, // 4 cards para telas grandes
            768: { slidesPerView: 3 },  // 3 cards para tablets
            480: { slidesPerView: 2 },  // 2 cards para celulares médios
            320: { slidesPerView: 1 }   // 1 card para celulares pequenos
        }
    });
});



let bruna = window.document.getElementById("bruna")
let leonardo = window.document.getElementById("leonardo")
let samanta = window.document.getElementById("samanta")
let setaDireita = window.document.getElementById("setadireita")
let setaEsquerda = window.document.getElementById("setaesquerda")
function rolarparadireita() {
    bruna.style = "display:none"
    leonardo.style = "display:flex"
    setaDireita.style = "display:none"
    setaEsquerda.style = "display:flex"
}

function rolarparaesquerda() {
    bruna.style = "display:flex"
    leonardo.style = "display:none"
    setaEsquerda.style = "display:none"
    setaDireita.style = "display:flex"
}

//Botão que dar acesso a página de gerar boletos
const url = "http://netmaniainternet.com.br/client"
const btn = document.querySelector("#btn_GetQuote")
function acessar(url) {
    const cliente = window.open(url, '_blank')
    cliente.focus()
}
btn.addEventListener('click', () => {
    window.open(url)
})

//Botão que dar acesso a página do plano de 500mg
function link_plano() {
    window.open("https://abrir.link/aWdtR", "_blank");

    //precisa alterar o link
}








function aceitarCookies() {
    localStorage.setItem('cookiesAceitos', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
    location.reload(); // Recarrega a página para ativar os cookies permitidos
}

function recusarCookies() {
    localStorage.setItem('cookiesAceitos', 'false');
    document.getElementById('cookie-banner').style.display = 'none';
    bloquearCookies(); // Chama a função para remover cookies opcionais
}

if (localStorage.getItem('cookiesAceitos') !== null) {
    document.getElementById('cookie-banner').style.display = 'none';
}

function bloquearCookies() {
    // Remove cookies não essenciais
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });

    // Remove scripts de rastreamento
    const analytics = document.getElementById("analytics-script");
    if (analytics) {
        analytics.remove();
    }
}

// Bloqueia cookies e scripts se o usuário recusou
if (localStorage.getItem('cookiesAceitos') === 'false') {
    bloquearCookies();
}
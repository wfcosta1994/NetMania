// Aguarda o DOM carregar completamente antes de inicializar o Swiper
function highlightCenterSlide() {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => slide.classList.remove('card-destaque'));

    const visibleSlides = [];
    slides.forEach(slide => {
        const rect = slide.getBoundingClientRect();
        if (rect.right > 0 && rect.left < window.innerWidth) {
            visibleSlides.push({
                slide: slide,
                centerDist: Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2)
            });
        }
    });

    if (visibleSlides.length > 0) {
        visibleSlides.sort((a, b) => a.centerDist - b.centerDist);
        visibleSlides[0].slide.classList.add('card-destaque');
    }
}

// Inicialização do Swiper
const swiper = new Swiper('.mySwiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0.1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        640: { slidesPerView: 1 }, //Para definir a quantidade de card que vai aparecer na tela
        768: { slidesPerView: 2 }, //Para definir a quantidade de card que vai aparecer na tela
        1024: { slidesPerView: 3 } //Para definir a quantidade de card que vai aparecer na tela
    },
    on: {
        init: () => highlightCenterSlide(),
        transitionEnd: () => highlightCenterSlide()
    }
});

// Atualiza o destaque se a janela for redimensionada
window.addEventListener('resize', highlightCenterSlide);




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

// Para ajudar na conexão do banco de dados MySQL

document.querySelector("form.indiqueGanhe").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        cliente: document.querySelector('input[name="cliente"]').value,
        cpf: document.querySelector('input[name="cpf"]').value,
        telefone: document.querySelector('input[name="telefone"]').value,
        indicado: document.querySelector('input[name="indicado"]').value,
        telefone_indicado: document.querySelector('input[name="telefone_indicado"]').value
    };

    console.log("Dados enviados:", formData);  // Verifique no console

    fetch("http://localhost:3000/salvar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta do servidor:", data);  // Verifique a resposta do servidor
            alert(data.message);
        })
        .catch(error => {
            console.error("Erro ao enviar:", error);
        });
});

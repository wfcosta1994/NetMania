// Aguarda o DOM carregar completamente antes de executar qualquer código
document.addEventListener("DOMContentLoaded", function () {

    // ----------------- SWIPER -----------------
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
            640: { slidesPerView: 1 },
            1110: { slidesPerView: 1 },
            1111: { slidesPerView: 3 }
        },
        on: {
            init: () => highlightCenterSlide(),
            transitionEnd: () => highlightCenterSlide()
        }
    });

    window.addEventListener('resize', highlightCenterSlide);

    // ----------------- ALTERAÇÕES DE CARDS -----------------
    let bruna = document.getElementById("bruna");
    let leonardo = document.getElementById("leonardo");
    let samanta = document.getElementById("samanta");
    let setaDireita = document.getElementById("setadireita");
    let setaEsquerda = document.getElementById("setaesquerda");

    function rolarparadireita() {
        if (bruna && leonardo && setaDireita && setaEsquerda) {
            bruna.style.display = "none";
            leonardo.style.display = "flex";
            setaDireita.style.display = "none";
            setaEsquerda.style.display = "flex";
        }
    }

    function rolarparaesquerda() {
        if (bruna && leonardo && setaDireita && setaEsquerda) {
            bruna.style.display = "flex";
            leonardo.style.display = "none";
            setaEsquerda.style.display = "none";
            setaDireita.style.display = "flex";
        }
    }

    let bonecoDireita = "img/icoDireita.jpg";
    let cards = document.getElementsByClassName("card");

    function alterarIcone(event) {
        let imagem = event.currentTarget.querySelector(".card-img-top");
        if (imagem) imagem.src = bonecoDireita;
    }

    function voltarIcone(event) {
        let imagem = event.currentTarget.querySelector(".card-img-top");
        if (imagem) imagem.src = "img/bonecosFrente.png";
    }

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('mouseover', alterarIcone);
        cards[i].addEventListener('mouseout', voltarIcone);
    }

    // ----------------- BOTÕES E LINKS -----------------
    const url = "https://portal.netmaniainternet.com.br/auth/login";
    const btn = document.querySelector("#btn_GetQuote");
    if (btn) {
        btn.addEventListener('click', () => {
            window.open(url, "_blank");
        });
    }

    function link_plano() {
        window.open("https://abrir.link/aWdtR", "_blank");
    }

    // ----------------- COOKIES -----------------
    function aceitarCookies() {
        localStorage.setItem('cookiesAceitos', 'true');
        document.getElementById('cookie-banner').style.display = 'none';
        location.reload();
    }

    function recusarCookies() {
        localStorage.setItem('cookiesAceitos', 'false');
        document.getElementById('cookie-banner').style.display = 'none';
        bloquearCookies();
    }

    function bloquearCookies() {
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });

        const analytics = document.getElementById("analytics-script");
        if (analytics) analytics.remove();
    }

    if (localStorage.getItem('cookiesAceitos') !== null) {
        document.getElementById('cookie-banner').style.display = 'none';
    }

    if (localStorage.getItem('cookiesAceitos') === 'false') {
        bloquearCookies();
    }

    // ----------------- FORMULÁRIO INDIQUE E GANHE -----------------
    const formIndique = document.querySelector("form.indiqueGanhe");
    if (formIndique) {
        formIndique.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = {
                cliente: document.querySelector('input[name="cliente"]').value,
                cpf: document.querySelector('input[name="cpf"]').value,
                telefone: document.querySelector('input[name="telefone"]').value,
                indicado: document.querySelector('input[name="indicado"]').value,
                telefone_indicado: document.querySelector('input[name="telefone_indicado"]').value
            };

            fetch("http://localhost:3000/salvar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message || "Dados enviados com sucesso!");
                })
                .catch(error => {
                    console.error("Erro ao enviar:", error);
                    alert("Erro ao enviar os dados.");
                });
        });
    }

    // ----------------- FORMULÁRIO VENDEDOR PARCEIRO -----------------
    const formVendedor = document.querySelector("form.vendedorParceiro");
    if (formVendedor) {
        formVendedor.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = {
                vendedor: formVendedor.querySelector('input[name="vendedor"]').value,
                cpf_cnpj: formVendedor.querySelector('input[name="cpf_cnpj"]').value,
                fantasia: formVendedor.querySelector('input[name="fantasia"]').value,
                telefone_vendedor: formVendedor.querySelector('input[name="telefone_vendedor"]').value
            };

            fetch("http://localhost:3000/salvar-vendedor-parceiro", { // <-- CORRIGIDO AQUI
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message || "Dados enviados com sucesso!");
                    formVendedor.reset(); // limpa os campos após envio
                })
                .catch(error => {
                    console.error("Erro ao enviar:", error);
                    alert("Erro ao enviar os dados.");
                });
        });
    }
});

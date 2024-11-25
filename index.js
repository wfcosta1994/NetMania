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

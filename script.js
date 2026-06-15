// CÓDIGO DO MODAL
let btnAjuda = document.querySelector(".botao-ajuda");
let btnFechar = document.querySelector(".botao-fechar");
let modal = document.querySelector(".modal-fundo");

btnAjuda.addEventListener("click", abreModal);
btnFechar.addEventListener("click", fechaModal);

function abreModal() {
    modal.style.display = "block";
}

function fechaModal() {
    modal.style.display = "none";
}


// TAMANHO DE FONTES
let tamanhoFonteAtual = 16;
const valorAdicionado = 2;
const valorSubtraido = 2;

let btnAumentaFonte = document.getElementById("btnAumentaTexto");
let btnDiminuiFonte = document.getElementById("btnDiminuiTexto");

btnAumentaFonte.addEventListener("click", aumentaFonte);
btnDiminuiFonte.addEventListener("click", diminuiFonte);

function aumentaFonte() {
    tamanhoFonteAtual = tamanhoFonteAtual + valorAdicionado;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}

function diminuiFonte() {
    tamanhoFonteAtual = tamanhoFonteAtual - valorSubtraido;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}

// LEITURA DE TELA

let lendo = false;

let btnLeitura = document.querySelector(".botao-leitura");

btnLeitura.addEventListener("click", lerEmVozAlta);

function lerEmVozAlta() {

    // se já está lendo
    if (lendo == true) {

        // se estiver pausado 
        if (speechSynthesis.paused == true){
            // continua de onde parou
            speechSynthesis.resume();
        } else {
            // pausa
            speechSynthesis.pause();
        }
        return;
    }

    let conteudo = document.querySelector("main");
    let texto = conteudo.innerText;

    let fala = new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";
    fala.onend = finalizarLeitura;

    lendo = true

    speechSynthesis.cancel();
    speechSynthesis.speak(fala);
}

function finalizarLeitura() {
    lendo = false;
}

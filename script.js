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
    // 1. Se já iniciou uma leitura anterior
    if (lendo) {
        if (speechSynthesis.speaking && !speechSynthesis.paused) {
            // Se está falando agora, pausa
            speechSynthesis.pause();
            btnLeitura.textContent = "Continuar Leitura"; // Opcional: muda texto do botão
        } else if (speechSynthesis.paused) {
            // Se estava pausado, continua
            speechSynthesis.resume();
            btnLeitura.textContent = "Pausar Leitura";
        }
        return;
    }

    // 2. Inicia uma nova leitura do zero
    let conteudo = document.querySelector("main");
    if (!conteudo) return; // Evita erros caso a tag main não exista na página

    let texto = conteudo.innerText;

    // Cancela qualquer leitura residual do navegador antes de começar
    speechSynthesis.cancel();

    let fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    
    // Configura os gatilhos de finalização e erro
    fala.onend = finalizarLeitura;
    fala.onerror = finalizarLeitura; 

    lendo = true;
    btnLeitura.textContent = "Pausar Leitura";
    
    speechSynthesis.speak(fala);
}

function finalizarLeitura() {
    lendo = false;
    btnLeitura.textContent = "Ouvir Texto"; // Reseta o texto do botão
}

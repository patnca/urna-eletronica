let titulo = document.querySelector('.tela__titulo span');
let cargo = document.querySelector('.tela__cargo span');
let numeros = document.querySelector('.tela__numeros');
let dados = document.querySelector('.tela__dados');
let imagens = document.querySelector('.tela__direita');
let rodape = document.querySelector('.tela__baixo');
let botao = document.querySelectorAll('[data-number]');
let branco = document.querySelector('.teclado__botao--branco');
let corrige = document.querySelector('.teclado__botao--corrige');
let confirma = document.querySelector('.teclado__botao--confirma');

let = etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function iniciaVotacao() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false;
    
    for(let i=0; i < etapa.numeros; i++){
        if(i===0){
            numeroHtml += '<div class="tela__num blink"></div>';
        } else {
            numeroHtml += '<div class="tela__num"></div>';
        }
    }

    titulo.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    dados.innerHTML = '';
    rodape.style.display = 'none';
    imagens.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        titulo.style.display = 'block';
        rodape.style.display = 'block';
        dados.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for( let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="tela__image tela__image--small"><img src="assets/images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="tela__image"><img src="assets/images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }
        imagens.innerHTML = fotosHtml;
    } else {
        titulo.style.display = 'block';
        rodape.style.display = 'block'
        dados.innerHTML = `<div class"aviso--grande blink">VOTO NULO</div>`;
    }
}


botao.forEach(button => {
    button.addEventListener('click', () => {
        let num = document.querySelector('.tela__num.blink');
        const n = button.dataset.number

        if (num !== null) {
            num.innerHTML = n;
            numero = `${numero}${n}`;

            num.classList.remove('blink');
            if(num.nextElementSibling !== null) {
                num.nextElementSibling.classList.add('blink');
            } else {
                atualizaInterface()
            }
        }
    })
})


branco.addEventListener('click', () => {
    numero = '';
    votoBranco = true;

    titulo.style.display = 'block';
    rodape.style.display = 'block'
    numeros.innerHTML = '';
    dados.innerHTML = '<div class="aviso--grande blink">VOTO EM BRANCO</div>';
    imagens.innerHTML = '';
});

corrige.addEventListener('click', () => {
    iniciaVotacao();
});

confirma.addEventListener('click', () => {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            iniciaVotacao();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--fim blink">FIM</div>';
            console.log(votos)
        }
    }
});

iniciaVotacao();

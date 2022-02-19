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

botao[0].addEventListener('click', () => {
    alert('clique no 1');
});
botao[1].addEventListener('click', () => {
    alert('clique no 2');
});
botao[2].addEventListener('click', () => {
    alert('clique no 3');
});
botao[3].addEventListener('click', () => {
    alert('clique no 4');
});
botao[4].addEventListener('click', () => {
    alert('clique no 5');
});
botao[5].addEventListener('click', () => {
    alert('clique no 6');
});
botao[6].addEventListener('click', () => {
    alert('clique no 7');
});
botao[7].addEventListener('click', () => {
    alert('clique no 8');
});
botao[8].addEventListener('click', () => {
    alert('clique no 9');
});
botao[9].addEventListener('click', () => {
    alert('clique no 0');
});

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
            document.querySelector('.tela').innerHTML = '<div class="aviso--maior blink">FIM</div>';
            console.log(votos)
        }
    }
});

function iniciaVotacao() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0; i < etapa.numeros; i++){
        if(i===0){
            numeroHtml += '<div class="tela__num blink"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
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
                fotosHtml += `<div class="tela__image tela__imagem--small"<img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="tela__image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }
        imagens.innerHTML = fotosHtml;
    } else {
        titulo.style.display = 'block';
        rodape.style.display = 'block'
        dados.innerHTML = `<div class"aviso--grande blink">VOTO NULO</div>`;
    }
}



iniciaVotacao();

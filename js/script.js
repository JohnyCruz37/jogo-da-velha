const celulas = document.querySelectorAll('.celulas');
const quadro = document.querySelector('.quadro');

let turnoBolinha;

const combinacaoVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//iniciar partida
const iniciarPartida = () =>{
    //função criada para adicionar uma ação em cada elemento do conjunto por tanto: cada elemento de CELULAS denominado CELULA vai receber uma mesma ação. Nesse caso quando acontecer o clique sobre uma 'celula' será acionado a função 'clicar'. E foi adicionado o comando 'once: true'. para que essa ação só ocorra no primeiro clique daquela celula e não se repita a função 'clicar' caso seja clicado na celula que já recebeu o primeiro clique.
    for(const celula of celulas){
    celula.addEventListener('click',clicar,{once: true})
    }

    let turnoBolinha = false;
    quadro.classList.add('x');
}

//chegar vitoria essa função verifica o 'jogador atual' e se existe alguma combinação das que estão determinadas na array 'combinacaoVitoria'. Em todos os elementos clicados 'index' ele avalia para saber se o jogadorAtual completou uma combinação.
function checarVitoria (jogadorAtual) {
    return combinacaoVitoria.some((combinacao) =>{
        return combinacao.every((index) => {
            return elementoCelula[index].classList.contains(jogadorAtual);
        });
    });
};

//adicionar classe oposta a atual
const marcar = (elementoCelula, adicionarClasse) =>{
    elementoCelula.classList.add(adicionarClasse);
};

//função para trocar a classa do quadro e assim trocar a vez do jogador.
const trocarTurno = () =>{
    turnoBolinha = !turnoBolinha; //'!' quer dizer o inverso do que é
    
    //elimina qualquer classe antes de adicionar outra
    quadro.classList.remove('o');
    quadro.classList.remove('x');

    //condicional para adicionar classe
    if(turnoBolinha){
        quadro.classList.add("o");
    }else{
        quadro.classList.add('x')
    }
}
//e = será o elemento da celula ou 'x' ou 'o'
var clicar = (e) =>{
    //adicionar a 'o' caso a anterior tenha cido 'x' e vice-versa;
    const elementoCelula = e.target;
    const adicionarClasse = turnoBolinha ? 'o' : 'x';

    marcar(elementoCelula, adicionarClasse);
    //verificar se existe a situação de vitória
    const campeao = checarVitoria(elementoCelula);
    if(campeao){
        console.log('voce venceu!')
    }
    
    //verificar se houve empate

    //mudar o simbolo
    trocarTurno();

}

iniciarPartida();



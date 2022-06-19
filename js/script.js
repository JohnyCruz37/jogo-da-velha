const celulas = document.querySelectorAll('.celulas');
const quadro = document.querySelector('.quadro');
const msgResultado = document.querySelector('.msg-resultado')
const msgPartida = document.querySelector('.msg-partida')
const reiniciar = document.querySelector('.reiniciar')
const limpar = document.querySelector('.limpar')
const renomear = document.querySelector('.renomear')
const nomeX = document.querySelector('.nome-x');
const nomeO = document.querySelector('.nome-o');
const pontoX = document.querySelector('.contador-x')
const pontoO = document.querySelector('.contador-o')
const pontoVelha = document.querySelector('.contador-velha')
const msgCampeao = document.querySelector('.msg-resultado')


// adicionar o nome dos jogadores
const nomeUm = prompt('Adicione o Nome do jogador "X":')
nomeX.innerText = nomeUm;
const nomeDois = prompt('Adicione o Nome do jogador "O":')
nomeO.innerText = nomeDois;


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
    let turnoBolinha = false;
    //função criada para adicionar uma ação em cada elemento do conjunto por tanto: cada elemento de CELULAS denominado CELULA vai receber uma mesma ação. Nesse caso quando acontecer o clique sobre uma 'celula' será acionado a função 'clicar'. E foi adicionado o comando 'once: true'. para que essa ação só ocorra no primeiro clique daquela celula e não se repita a função 'clicar' caso seja clicado na celula que já recebeu o primeiro clique.
    // e ao mesmo tempo servirá para resetar todo o jogo quando clicado no botão reiniciar
    for(const celula of celulas){
    celula.classList.remove('o');
    celula.classList.remove('x');
    celula.removeEventListener('click', clicar);
    celula.addEventListener('click',clicar,{once: true})
    }

    alternarTurno();
    msgPartida.classList.remove('mostrar-resultado');//retirar a tela com o resultado
}


//chegar vitoria essa função verifica o 'jogador atual' e se existe alguma combinação das que estão determinadas na array 'combinacaoVitoria'. Em todos os elementos clicados 'index' ele avalia para saber se o jogadorAtual completou uma combinação.
const checarVitoria = (jogadorAtual) => {
    return combinacaoVitoria.some((combinacao) =>{
        return combinacao.every((index) => {
            return celulas[index].classList.contains(jogadorAtual);
        });
    });
};

//empate
const checarEmpate = () => {
    return [...celulas].every((celula) =>{
        return celula.classList.contains('x') || celula.classList.contains('o');
    })
};

//finalizar jogo
const fimPartida = (empate) => {
    if(empate){
        msgResultado.innerText = 'Deu Velha!';
        let pVelha = pontoVelha.textContent;
        pVelha = parseInt(pVelha)
        pontoVelha.innerText = pVelha + 1;
    } else {       

        msgResultado.innerText = turnoBolinha 
                                ? nomeO.textContent +' é o campeão!' 
                                : nomeX.textContent + ' é o campeão';
        
        if(turnoBolinha){
            let pBolinha = pontoO.textContent;
            pBolinha = parseInt(pBolinha)

            pontoO.innerText = pBolinha + 1;
        }else{
            let pX = pontoX.textContent
            pX = parseInt(pX);

            pontoX.innerText = pX + 1;
        }   
    }
    msgPartida.classList.add('mostrar-resultado');
}

//limpar placar
function limparPlacar () {
    pontoX.innerText = 0;
    pontoO.innerText = 0;
    pontoVelha.innerText = 0; 
}
 

//adicionar classe oposta a atual
const marcar = (eCel, addClasse) =>{
    eCel.classList.add(addClasse);
};
// alternar os turnos entre bolinha e x
const alternarTurno = () => {
    //elimina qualquer classe antes de adicionar outra
    quadro.classList.remove('o');
    quadro.classList.remove('x');

    //condicional para adicionar classe
    if(turnoBolinha){
        quadro.classList.add("o");
    }else{
        quadro.classList.add('x');
    }
};


//função para trocar a classe do quadro e assim trocar a vez do jogador.
const trocarTurno = () =>{
    turnoBolinha = !turnoBolinha; //'!' quer dizer o inverso do que é
    
    alternarTurno();
};

//e = será o elemento da celula ou 'x' ou 'o'

const clicar = (e) =>{
    //adicionar a 'o' caso a anterior tenha cido 'x' e vice-versa;
    const elementoCelula = e.target;
    const adicionarClasse = turnoBolinha ? 'o' : 'x';

    marcar(elementoCelula, adicionarClasse);

    //verificar se existe a situação de vitória
    const campeao = checarVitoria(adicionarClasse);
    //verificar se houve empate
    const empate = checarEmpate();

    if (campeao){
        fimPartida(false);

    } else if (empate) {
        fimPartida(true);
    } else {
        //mudar o simbolo
        trocarTurno();
    }

}


iniciarPartida();
reiniciar.addEventListener('click', iniciarPartida);
limpar.addEventListener('click', limparPlacar)

renomear.addEventListener('click', () =>{
    // adicionar o nome dos jogadores
    const nomeUm = prompt('Adicione o Nome do jogador "X":')
    nomeX.innerText = nomeUm;
    const nomeDois = prompt('Adicione o Nome do jogador "O":')
    nomeO.innerText = nomeDois;

    limparPlacar();
    
})
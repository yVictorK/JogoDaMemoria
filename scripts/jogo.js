const jogo = document.querySelector('.jogo_da_memoria');
const jogador = document.querySelector('.jogador');

const texto = [
  'innerHTML',
  'console.log',
  'alert',
  'addEventListener()',
  'Onclick',
  'onmouseover',
];
const conceitos = [
  'Manipulando elementos do HTML',
  'Escreve dados no console',
  'Cria um pop-up de mensagem na página',
  'adicionar um evento de entrada de dados a um elemento HTML',
  'Função JavaScript que será executada quando o elemento for clicado',
  'Evento de quando o mouse esta sobre algum elemento',
]
textos = [...texto, ...conceitos]

const criarElemento = (tipo, nomeclass) => {
  const element = document.createElement(tipo);
  element.className = nomeclass;
  return element;
}

let carta1 = '', carta2 = '';

const progresso = () => {
  const cartasOff = document.querySelectorAll('.carta-revelada');

  if (cartasOff.length == 12) {
    setTimeout(() => {
      const op = confirm(`Parabéns por concluir o Quiz ${localStorage.getItem('player')}!
Deseja jogar novamente?`);
      if (op == true) {
        location.reload();
      } else {
        location = '../html/index.html';
      }
    }, 1500);
  }
}

const verificarCartas = () => {

  const primeiraCarta = carta1.getAttribute('data-par');
  const segundaCarta = carta2.getAttribute('data-par');
  console.log(primeiraCarta, segundaCarta)
  if (primeiraCarta == segundaCarta) {
    carta1.firstChild.classList.add('carta-revelada');
    carta2.firstChild.classList.add('carta-revelada');
    carta1 = '';
    carta2 = '';
    progresso();
  } else {
    setTimeout(() => {
      carta1.classList.remove('virar-carta');
      carta2.classList.remove('virar-carta');
      carta1 = '';
      carta2 = '';
    }, 1500);

  }
}

const virarCarta = ({ target }) => {

  if (target.parentNode.className.includes('virar-carta')) {
    return;
  }

  if (carta1 == '') {
    target.parentNode.classList.add('virar-carta');
    carta1 = target.parentNode;
  } else if (carta2 == '') {
    target.parentNode.classList.add('virar-carta');
    carta2 = target.parentNode;

    verificarCartas();
  }

}

const buscarPar = (text) => {
  for (var i = 0; i < 6; i++) {
    if (text == texto[i] || text == conceitos[i]) {
      return i;
    }
  }
}

const criarCartas = (text) => {

  const carta = criarElemento('div', 'card');
  const frente = criarElemento('div', 'front_card');
  const verso = criarElemento('div', 'back_card');

  frente.innerHTML = text;
  carta.appendChild(frente);
  carta.appendChild(verso);
  carta.addEventListener('click', virarCarta);
  carta.setAttribute('data-par', buscarPar(text))
  return carta;
}

function mostrarCartas() {
  const cartasInicio = document.querySelectorAll('.card');

  cartasInicio.forEach((carta) => {
    carta.classList.add('virar-carta');
  });

  setTimeout(() => {
    cartasInicio.forEach((carta) => {
      carta.classList.remove('virar-carta');
    });
  }, 3000);

}

const carregar = () => {

  const embaralharArray = textos.sort(() => Math.random() - 0.5)

  embaralharArray.forEach((text) => {
    const card = criarCartas(text);
    jogo.appendChild(card);
  })
  setTimeout(() => {
    mostrarCartas();
  }, 1000);
};

window.onload = () => {

  jogador.innerHTML = localStorage.getItem('player')
  carregar();

}



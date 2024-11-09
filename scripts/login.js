const campo = document.querySelector('.input-nome');
const botao = document.querySelector('.button-login');
const form = document.querySelector('form');

const validInput = ({target}) =>{
    if(target.value.length>2){
        botao.removeAttribute('disabled');
        campo.style.borderColor = '#101014'
        return;
    }else{
        botao.setAttribute('disabled', '');
        campo.style.borderColor = '#eb0037';
    }
}
const submitForm = (event) =>{
    event.preventDefault();
    localStorage.setItem('player',campo.value);
    window.location = '../html/jogo.html';
}

campo.addEventListener('input', validInput);
form.addEventListener('submit', submitForm);
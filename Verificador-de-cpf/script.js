$(document).ready(function () {       //executa apenas quando o html é carregado
    $('#cpf').inputmask('999.999.999-99');
});

function validar() {
    const cpf = document.getElementById("cpf").value;
    const cpfFormatado = formatar(cpf);

    if (cpfFormatado.length != 11) {
        mensagem("O CPF deve conter 11 números.", 'red')
        return;
    }

    const dv1 = 1;
    const dv2 = 2;
}

function formatar(cpf) {
    cpf = cpf.replace(/\D/g, ''); // "/\D/"=caracteres não nuéricos, g = global 
    return cpf;
}

function verificarDigitosRepetidos() {
    mensagem("Os números digitados devems er diferentes.","red")

}


function verificarDv(cpf, posicao) {
    const sequencia = cpf.slice(posicao -1 , 8 + posicao).split('');
    let soma = 0;
    let multiplicador = 10;

    for (const numero of sequencia) {
        soma += multiplicador * Number(numero);
        multiplicador--;
        
    }
    const resto = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);
    return resto == digito;
}



function mensagem(texto, cor){
    const mensagem = document.getElementById("mensagem");
    const mensagemBox = document.getElementById("mensagemBox");
    mensagem.innerHTML = texto;
    mensagemBox.style.backgroundColor = cor;
    
}
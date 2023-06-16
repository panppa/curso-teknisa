$(document).ready(function () {       //executa apenas quando o html é carregado
    $('#cpf').inputmask('999.999.999-99');
});

function validar() {
    const cpf = document.getElementById("cpf").value;
    const cpfFormatado = formatar(cpf);
    console.log(cpfFormatado);
    console.log(cpf);

    if (cpfFormatado.length != 11) {
        mensagem("O CPF deve conter 11 números.", 'red')
        return;
    }

    const dv1 = 1;
    const dv2 = 2;


    console.log(dv1, dv2)

    console.log(verificarDv(cpfFormatado, dv2));
}

function formatar(cpf) {
    cpf = cpf.replace(/\D/g, ''); // "/\D/"=caracteres não nuéricos, g = global 
    return cpf;
}

function verificarDigitosRepetidos() {
    mensagem("Os números digitados devems er diferentes.","red")

}


  /*
  function verificarDv(cpf, posicao) {
    const sequencia = cpf.slice(0, 8 + posicao).split('');
    console.log (sequencia);
  
    let soma = 0;
    let multiplicador = posicao;
  
    for (const numero of sequencia) {
      soma += multiplicador * Number(numero);
      multiplicador--;
    }
  
    const restoDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);
    const digitoVerificador = restoDivisao < 2 ? 0 : 11 - restoDivisao === Number(digito)
    return String(digitoVerificador);
  }*/


function mensagem(texto, cor){
    const mensagem = document.getElementById("mensagem");
    const mensagemBox = document.getElementById("mensagemBox");
    mensagem.innerHTML = texto;
    mensagemBox.style.backgroundColor = cor;
    
}
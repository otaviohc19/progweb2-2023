// // Pegar um Elemento HTML para usá-lo no Javascript
// const elemento = document.querySelector("#idDoElemento");

// // Criar uma ação em um elemento (como um botão)
// elemento.addEventListener("click", executarFuncao);

// // Função de execução da ação
// function executarFuncao() {

// }
// // Pegar um Elemento HTML para usá-lo no Javascript
let cmbPartida = document.getElementById("cmbPartida");
let cmbDestino = document.getElementById("cmbDestino");
let txtAdultos = document.getElementById("txtAdultos");
let txtCriancas = document.getElementById("txtCriancas");
let txtBebes = document.getElementById("txtBebes");
let chkIdaVolta = document.getElementById("chkIdaVolta");
let btnOrcamento = document.getElementById("btnOrcamento");
let orcamento = document.getElementById("#orcamento");

// Criar uma ação em um elemento (como um botão)
btnOrcamento.addEventListener("click", calcularOrcamento);

function calculaPreco() {
  // Todo campo de formulário retorna uma string
  let adultos = parseInt(txtAdultos.value);
  let criancas = parseInt(txtCriancas.value);
  let bebes = parseInt(txtBebes.value);
  let partida = cmbPartida.value;
  let destino = cmbDestino.value;

  let erro = '';
  let total = 0;
  if (adultos < 1 && bebes > 0) {
    erro = 'Bebês não podem viajar sozinhos';
  } else if (bebes > 2) {
    erro = 'São permitidos até 2 bebês por compra';
  }else if (partida == destino) {
    erro = 'O destino não pode ser o local de partida';
  } else if (adultos){
    // COMPLETAR!!!!!!!!!!!!
  } else  {
    // Deus certo, vamos realizar o cálculo
    
    let passagem = 0;
    if ( (partida == 'Uberlândia' && destino == 'São Paulo') || (partida == 'São Paulo' && destino == 'Uberlândia') ) {
      passagem = 200;
    } else if ( (partida == 'Uberlândia' && destino == 'Rio de Janeiro') || (partida == 'Rio de Janeiro' && destino == 'Uberlândia') ) {
      passagem = 300;
    }else {
      passagem = 150;
    }
      
    let total = adultos * passagem + (criancas * passagem)/2;

    let isIdaVolta = chkIdaVolta.checked;
  if (isIdaVolta) {
    total = total + (total * 0.9);
  }
}

// Verificando se ocorreu um errou ou se o cálculo foi realizado
if (erro != '') {
  orcamento.innerHTML = `<b>Erro:</b> ${erro}`;
} else {
  orcamento.innerHTML = `<b>Valor total:</b> R$ ${total.toFixed(2, ',')}`;
}
}
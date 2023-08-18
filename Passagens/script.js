// // Pegar um Elemento HTML para usá-lo no Javascript
// const elemento = document.querySelector("#idDoElemento");

// // Criar uma ação em um elemento (como um botão)
// elemento.addEventListener("click", executarFuncao);

// // Função de execução da ação
// function executarFuncao() {

// }

const cmbPartida = document.getElementById("cmbPartida");
const cmbDestino = document.getElementById("cmbDestino");
const txtAdultos = document.getElementById("txtAdultos");
const txtCriancas = document.getElementById("txtCriancas");
const txtBebes = document.getElementById("txtBebes");
const chkIdaVolta = document.getElementById("chkIdaVolta");
const btnOrcamento = document.getElementById("btnOrcamento");

btnOrcamento.addEventListener("click", calcularOrcamento);

function calcularOrcamento() {
  const adultosIda = parseInt(txtAdultos.value);
  const criancasIda = parseInt(txtCriancas.value);
  const bebesIda = parseInt(txtBebes.value);
  const isIdaVolta = chkIdaVolta.checked;

  const precoBaseUberlandiaSP = 200;
  const precoBaseUberlandiaRJ = 300;
  const precoBaseSPRJ = 150;
  const descontoVolta = 0.1;

  let precoTotal = 0;

  if (cmbPartida.value === "Uberlândia" && cmbDestino.value === "São Paulo") {
    precoTotal = calcularPrecoViagem(
      adultosIda,
      criancasIda,
      bebesIda,
      precoBaseUberlandiaSP,
      isIdaVolta,
      descontoVolta
    );
  } else if (
    cmbPartida.value === "Uberlândia" &&
    cmbDestino.value === "Rio de Janeiro"
  ) {
    precoTotal = calcularPrecoViagem(
      adultosIda,
      criancasIda,
      bebesIda,
      precoBaseUberlandiaRJ,
      isIdaVolta,
      descontoVolta
    );
  } else if (
    cmbPartida.value === "São Paulo" &&
    cmbDestino.value === "Rio de Janeiro"
  ) {
    precoTotal = calcularPrecoViagem(
      adultosIda,
      criancasIda,
      bebesIda,
      precoBaseSPRJ,
      isIdaVolta,
      descontoVolta
    );
  }

  exibirValor(precoTotal);
}

function calcularPrecoViagem(
  adultosIda,
  criancasIda,
  bebesIda,
  precoBase,
  isIdaVolta,
  descontoVolta
) {
  const precoIda =
    adultosIda * precoBase +
    criancasIda * (precoBase / 2) +
    bebesIda * 0;

  let precoVolta = 0;
  if (isIdaVolta) {
    precoVolta = adultosIda * precoBase * (1 - descontoVolta) +
      criancasIda * (precoBase / 2) * (1 - descontoVolta) +
      bebesIda * 0;
  }

  return precoIda + precoVolta;
}

function exibirValor(precoTotal) {
  const valoresDiv = document.querySelector(".content h1 + div");
  valoresDiv.innerHTML = `<p>O valor total da viagem é: R$${precoTotal.toFixed(2)}</p>`;
}

// scripts.js

// function soAceitaPares (numero) {
//     if (numero % 2 == 0) {
//         console.log("É par");
//     } else {
//         console.log("É ímpar");
//     }
// }

function soAceitaPares(numero) {
    return new Promise(function (resolve, reject){
        if (numero % 2 == 0) {
            resolve("É par"); // A promessa retorna sucesso
        } else {
            reject("Não é par"); // A promessa retorna 'insucesso'
        }
    });
}

console.log("Antes de testar");

// Se der sucesso cai no 'then', se der insucesso cai no 'catch'
soAceitaPares(10)
    .then(resposta => console.log(resposta))
    .catch(resposta => console.warn(resposta));

console.log("Depois de testar");

let btn = document.querySelector("#btn");

/*
// Função normal
btn.addEventListener("click", clicarBotao);

function clicarBotao(event) {
    // let alvo = event.target;
    // let title = alvo.getAttribute("title");
    // console.log(title);
    // Forma resumida
    console.log(event.target.getAttribute("title"));
}
*/

// Arrow Function
// Usa {} para poder fazer a função em mais de uma linha
btn.addEventListener("click", (event) => {
    console.log(event.target.getAttribute("title"));
})
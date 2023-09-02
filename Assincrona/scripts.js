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
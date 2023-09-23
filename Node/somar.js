// somar.js
let args = process.argv;

let num1 = args[2] ?? 0;
let num2 = args[3] ?? 0;

let resultado = somar(parseInt(num1), parseInt(num2));
console.log("Resultado:" + resultado);

function somar(num1, num2) {
    return num1 + num2;
}
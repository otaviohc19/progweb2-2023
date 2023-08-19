let frutas = ["Abacaxi", "Banana", "Caju", "Tomate", "Uva"];
console.log(frutas);

let primeiro = frutas[0];
console.log("Primeiro:", primeiro);
let segundo = frutas[1];
console.log("Segudo:", segundo);

let tam = frutas.length; // tamanho da lista
console.log("Tamanho:", tam);
let ultimo = frutas[ tam - 1];
console.log("Último:", ultimo);

frutas[1] = "Bergamota";
console.log(frutas);

console.log("Segundo antes", segundo);
segundo = frutas[1];
console.log("Segundo depois", segundo);

frutas[5] = "Jaca";
console.log(frutas);

tam = frutas.length;
frutas[tam] = "Morango";
console.log(frutas);

// Adiciona o elemento no FINAL da lista
frutas.push("Laranja");
frutas.push("Melancia", "Kiwi");
console.log(frutas);

// Remove o elemento FINAL da lista (e o retona)
ultimo = frutas.pop();
console.log("Retirou: ", ultimo);
console.log(frutas);

// Adiciona o elemento no INICIO da lista
frutas.unshift("Carambola");
frutas.unshift("Pêra");
console.log(frutas);

// Remove o elemento do INICIO da lista (e o retona)
primeiro = frutas.shift();
console.log("Retirou:", primeiro);
console.log(frutas);

// Percorrer o vetor
// FOR - iteração por número
console.log("----------- FOR -----------")
for (let i = 0; i < frutas.length; i++) {
    console.log(i, frutas[i]);
}

console.log("----------- FOR OF -----------")
// FOR OF - iteração por elemento
for (let fruta of frutas) {
    console.log(fruta);
}

// OBJETOS
console.log("######## OBJETOS #######");

let carro = {
    marca: 'Fiat',
    modelo: 'Uno',
    cor: 'Branco',
    ano: 2005,
    flex: false
}

console.log(carro["modelo"]);
console.log(carro);

carro["portas"] = 4;
console.log(carro);

console.log(carro.marca);

let info = "ano";
console.log(carro[info]);

let curso = {
    nome: "ADS",
    periodos: [
        {
            nome: '1º Período',
            lab: 'B03',
            representante: 'Alan',
            disciplinas: [
                {
                    professor: 'Marcelo',
                    nome: 'Sistemas Digitais'
                },
                {
                    professor: 'Marco',
                    nome: 'Cálculo'
                }
            ]
        },

        {
            nome: '4º Período',
            lab: 'B05',
            representante: 'Lara',
            disciplinas: [
                {
                    professor: 'Daniel',
                    nome: 'Dispositivos Móveis'
                },
                {
                    professor: 'Daniel',
                    nome: 'Programação para Internet 2'
                }
            ]
        }
    ]
}

// O nome do primeiro professor do 4 periodo
let nomeProf = curso.periodos[1].disciplinas[0].professor;
console.log(nomeProf);
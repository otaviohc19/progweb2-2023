const mundoPaises = document.getElementById('select');
const mundoDiv = document.getElementById('mundoDiv');

// Fazer uma solicitação à API para obter a lista de países
console.log("Fazendo a requisição de dados...");
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json(), 
    console.log("Sucesso ao buscar a lista de países")
    )
    .then(data => {
        // Ordenar os países em ordem alfabética pelo nome comum
        data.sort((a, b) => {
            const nameA = a.name.common.toLowerCase();
            const nameB = b.name.common.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        // Preencher a caixa de seleção com os nomes dos países ordenados
        data.forEach(pais => {
            const optionElement = document.createElement('option');
            optionElement.value = pais.name.common;
            optionElement.text = pais.name.common;
            mundoPaises.appendChild(optionElement);
        });
        console.log("Sucesso ao preencher a lista de países")
    })
.catch(error => {
    console.error('Erro ao buscar lista de países:', error);
});



// Pegando o valor do nome selecionado
mundoPaises.addEventListener('change', function() {
    const nomeDoPais = mundoPaises.value;
    // console.log(nomeDoPais);
});


function exibePaises() {
    mundoDiv.innerHTML = "";
    for (let pais of paises) {
        let html = `
            <div class="infoPaises">
                <h1>${pais.name.common}</h1>
            </div>    
        `;

        mundoDiv.insertAdjacentHTML("beforeend", html);
    }
}
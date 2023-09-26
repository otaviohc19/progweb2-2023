document.addEventListener('DOMContentLoaded', function () {
    const mundoPaises = document.getElementById('select');
    const mundoDiv = document.getElementById('mundoDiv');

    // Função para fazer uma solicitação à API e obter a lista de países
    function obterListaDePaises() {
        return fetch('https://restcountries.com/v3.1/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível obter a lista de países.');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Erro ao buscar lista de países:', error);
            });
    }

    // Função para preencher a caixa de seleção com os nomes dos países
    function preencherListaDePaises(data) {
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
    }

    // Função para carregar informações do país selecionado
    function carregaInformacoesDoPais(nomeDoPais) {
        fetch(`https://restcountries.com/v3.1/name/${nomeDoPais}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível obter informações do país.');
                }
                return response.json();
            })
            .then(data => {
                const pais = data[0];

                // Limpar o conteúdo anterior
                mundoDiv.innerHTML = "";

                // Exibir informações do país
                const html = `
                    <div class="infoPaises">
                        <h1>${pais.name.common}</h1>
                        <img src="${pais.flags.png}" alt="Bandeira de ${pais.name.common}">
                        <p>Capital: ${pais.capital[0]}</p>
                        <p>Continente: ${pais.region}</p>
                        <p>População: ${pais.population.toLocaleString()}</p>
                        <p>Área: ${pais.area.toLocaleString()} km²</p>
                        <p>Moedas: ${Object.values(pais.currencies).map(c => c.name).join(', ')}</p>
                        <p>Idiomas: ${Object.values(pais.languages).join(', ')}</p>
                    </div>
                `;

                mundoDiv.insertAdjacentHTML("beforeend", html);
            })
            .catch(error => {
                console.error('Erro ao buscar informações do país:', error);
            });
    }

    // Adicionar evento para carregar informações de países ao selecionar
    mundoPaises.addEventListener('change', function () {
        const nomeDoPais = mundoPaises.value;
        if (nomeDoPais) {
            carregaInformacoesDoPais(nomeDoPais);
        }
    });

    // Inicialização da aplicação
    console.log("Fazendo a requisição de dados...");
    obterListaDePaises()
        .then(data => {
            preencherListaDePaises(data);
            console.log("Sucesso ao buscar a lista de países");
        });
});

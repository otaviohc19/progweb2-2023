
let nome = document.querySelector("header .info h1");
nome.innerHTML = bd.nome;

// ALTERAR O HTML DO SITE
// É POSSÍVEL USAR PARA ALTERAR O CONTEÚDO APENAS 1X
document.querySelector("header .info .generos").innerHTML = bd.generos;
document.querySelector("header .info p").innerHTML = bd.resumo;
document.querySelector("header .info .nota").innerHTML = bd.nota;

// ALTERAR ATRIBUTO DO SITE
let poster = document.querySelector("header .poster img");
poster.setAttribute("src", bd.fotoPoster);

// ALTERAR O CSS DO SITE
document.querySelector("header").style.backgroundImage = `url("${bd.fotoBg}")`;

// ELENCO
let elencoContainer = document.querySelector(".elenco-container");
elencoContainer.innerHTML = "";

for (let ator of bd.elenco) {
    let html = `
        <div class="ator">
            <img src="${ator.foto}" />
            <span class="nome">${ator.nome}</span>
            <span class="personagem">${ator.personagem}</span>
        </div>
    `;

    elencoContainer.insertAdjacentHTML("beforeend", html);
}

// TEMPORADAS
let tempContainer = document.querySelector(".temporadas-container");
tempContainer.innerHTML = "";

for (let temp of bd.temporadas) {
    let numero = temp.numero;
    let html = `
    <div class="temporada">
        <div class="poster">
            <img src="${temp.poster}">
        </div>
        <div class="info">
            <h3>Temporada ${numero}</h3>
            <div class="subtitulo">
                ${temp.numero_episodios} episódios
            </div>
            <p class="sinopse">
                ${temp.resumo}
            </p>
            <a href="#" class="botao" id="btn-${numero}">Ver episódios</a>
            <div class="episodios" id="episodios-${numero}"></div>
        </div>
    </div>
    `;

    // COLOCA NA PAGINA PRIMEIRO
    tempContainer.insertAdjacentHTML("beforeend", html);
    // DEPOIS PEGA O BOTÃO
    let btnEpisodios = document.querySelector(`#btn-${numero}`);
    btnEpisodios.addEventListener("click", mostraEpisodios);
}

function mostraEpisodios(evento) {
    // Impedindo o comportamento padrão do elemento
    evento.preventDefault();

    // Pegando o elemento que disparou o evento(clique)
    let target = evento.target;
    // Pega o ID dele
    let id = target.getAttribute("id");
    // Pega o numero dentro da string || substring(onde começa, onde termina) "btn-1"
    let numero = parseInt(id.substring(4));

    let epContainer = document.querySelector(`#episodios-${numero}`);
    
    // Verificando se já existe conteúdo no container de episódios
    if (epContainer.innerHTML != "") {
        epContainer.innerHTML = "";
        return;
    }

    for (let episodio of bd.temporadas[numero-1].episodios){
    const html = `
        <div class="episodio">
            <div class="foto">
                <img src="${episodio.foto}" />
                <span class="nota"><img src="star.png">${episodio.nota}</span>
            </div>
            <div class="info">
                <h4>${episodio.numero} | ${episodio.nome}</h4>
                <p>${episodio.resumo}</p>
            </div>
        </div>
    `;

    epContainer.insertAdjacentHTML("beforeend", html);
    }

}



/*
afterbegin -> Depois do comeco
beforebegin -> Antes do comeco
afterend -> Depois do fim
beforeend -> Antes do fim

HTML

beforebegin<div>afterbegin CONTEUDO beforeend</div>afterend
*/
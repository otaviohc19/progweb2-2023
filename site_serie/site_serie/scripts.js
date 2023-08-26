
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

/*
afterbegin -> Depois do comeco
beforebegin -> Antes do comeco
afterend -> Depois do fim
beforeend -> Antes do fim

HTML

beforebegin<div>afterbegin CONTEUDO beforeend</div>afterend
*/
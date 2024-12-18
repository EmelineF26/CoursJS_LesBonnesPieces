// On récupère les pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // On récupère l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // On crée une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // On crée des balises 
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);

    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);

    // On ajoute des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);
}

// Gestion des boutons de triage
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonees = Array.from(pieces);
    piecesOrdonees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonees);
});


const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
});

// Exercice 2
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonees = Array.from(pieces);
    piecesOrdonees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonees);
});

const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");

boutonFiltrerDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.description
    });
    console.log(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].prix > 35){
    noms.splice(i,1);
    }
}
console.log(noms);

// Création de la liste
const abordablesElements = document.createElement('ul');
// Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(abordablesElements)

// Exercice 3 - Affichage des descriptions et du prix des pièces abordables
const nomsPiecesDisponibles = pieces.map(piece => piece.nom)
const prixPiecesDisponibles = pieces.map(piece => piece.prix)

for(let i = pieces.length -1 ; i >= 0; i--){
    if (pieces[i].disponibilite === false){
        nomsPiecesDisponibles.splice(i,1)
        prixPiecesDisponibles.splice(i,1)
    }
}

const disponiblesElement = document.createElement('ul');

for(let i=0 ; i < nomsPiecesDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsPiecesDisponibles[i]} - ${prixPiecesDisponibles[i]} €`
    disponiblesElement.appendChild(nomElement);
}

document.querySelector('.disponibles').appendChild(disponiblesElement);

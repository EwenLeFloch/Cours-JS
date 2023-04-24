import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

const reponse = await fetch("http://localhost:8081/pieces/");
const pieces = await reponse.json();

ajoutListenerEnvoyerAvis();

const sectionFiches = document.querySelector(".fiches");

function genererPieces(pieces) {
	for (let i = 0; i < pieces.length; i++) {
		const article = pieces[i];
		const pieceElement = document.createElement("article");
		sectionFiches.appendChild(pieceElement);

		// Images
		const imageElement = document.createElement("img");
		imageElement.src = article.image;
		pieceElement.appendChild(imageElement);

		// Noms
		const nomElement = document.createElement("h2");
		nomElement.innerText = article.nom;
		pieceElement.appendChild(nomElement);

		// Prix
		const prixElement = document.createElement("p");
		prixElement.innerText = `Prix: ${article.prix} € ( ${
			article.prix < 35 ? "€" : "€€€"
		})`;
		pieceElement.appendChild(prixElement);

		// Catégorie
		const categorieElement = document.createElement("p");
		categorieElement.innerText = article.categorie ?? "(Aucune catégorie)";
		pieceElement.appendChild(categorieElement);

		// Description
		const descriptionElement = document.createElement("p");
		descriptionElement.innerText =
			article.description ??
			"Pas de description disponible pour le moment.";
		pieceElement.appendChild(descriptionElement);

		// Disponibilité
		const disponibiliteElement = document.createElement("p");
		disponibiliteElement.innerText = article.disponibilite
			? "En stock"
			: "Rupture de stock";
		pieceElement.appendChild(disponibiliteElement);

		// Boutons Avis
		const avisBouton = document.createElement("button");
		avisBouton.dataset.id = article.id;
		avisBouton.textContent = "Afficher les avis";
		pieceElement.appendChild(avisBouton);
	}
	ajoutListenersAvis();
}
genererPieces(pieces);

// Trier par prix croissant
const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");

boutonTrierCroissant.addEventListener("click", function () {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort((a, b) => a.prix - b.prix);
	sectionFiches.innerHTML = "";
	genererPieces(piecesOrdonnees);
});

// Trier par prix décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");

boutonTrierDecroissant.addEventListener("click", function () {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort((a, b) => b.prix - a.prix);
	sectionFiches.innerHTML = "";
	genererPieces(piecesOrdonnees);
});

// Filtrer les pièces abordables
const boutonFiltrerPrix = document.querySelector(".btn-filtrer-prix");

boutonFiltrerPrix.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter((piece) => piece.prix <= 35);
	sectionFiches.innerHTML = "";
	genererPieces(piecesFiltrees);
});

// Filter les pièces sans descriptions
const boutonFiltrerDesc = document.querySelector(".btn-filtrer-desc");

boutonFiltrerDesc.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter((piece) => piece.description);
	sectionFiches.innerHTML = "";
	genererPieces(piecesFiltrees);
});

// Pieces abordables
const noms = pieces.map((piece) => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].prix > 35) {
		noms.splice(i, 1);
	}
}
const abordablesElements = document.createElement("ul");
for (let i = 0; i < noms.length; i++) {
	const nomElement = document.createElement("li");
	nomElement.innerText = noms[i];
	abordablesElements.appendChild(nomElement);
}
document.querySelector(".abordables").appendChild(abordablesElements);

// Pièces disponibles
const nomsDisponibles = pieces.map((piece) => piece.nom);
const prixDisponibles = pieces.map((piece) => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
	if (!pieces[i].disponibilite) {
		nomsDisponibles.splice(i, 1);
		prixDisponibles.splice(i, 1);
	}
}

const disponiblesElements = document.createElement("ul");
for (let i = 0; i < nomsDisponibles.length; i++) {
	const nomElement = document.createElement("li");
	nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
	disponiblesElements.appendChild(nomElement);
}
document.querySelector(".disponibles").appendChild(disponiblesElements);

const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return piece.prix <= inputPrixMax.value;
	});
	sectionFiches.innerHTML = "";
	genererPieces(piecesFiltrees);
});

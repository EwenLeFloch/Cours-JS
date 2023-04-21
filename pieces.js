const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {
	const sectionFiches = document.querySelector(".fiches");
	const pieceElement = document.createElement("article");

	// Images
	const imageElement = document.createElement("img");
	imageElement.src = pieces[i].image;

	// Noms
	const nomElement = document.createElement("h2");
	nomElement.innerText = pieces[i].nom;

	// Prix
	const prixElement = document.createElement("p");
	prixElement.innerText = `Prix: ${pieces[i].prix} € ( ${
		pieces[i].prix < 35 ? "€" : "€€€"
	})`;

	// Catégorie
	const categorieElement = document.createElement("p");
	categorieElement.innerText = pieces[i].categorie ?? "(Aucune catégorie)";

	// Description
	const descriptionElement = document.createElement("p");
	descriptionElement.innerText =
		pieces[i].description ??
		"Pas de description disponible pour le moment.";

	// Disponibilité
	const disponibiliteElement = document.createElement("p");
	disponibiliteElement.innerText = pieces[i].disponibilite
		? "En stock"
		: "Rupture de stock";

	sectionFiches.appendChild(pieceElement);
	pieceElement.appendChild(imageElement);
	pieceElement.appendChild(nomElement);
	pieceElement.appendChild(prixElement);
	pieceElement.appendChild(categorieElement);
	pieceElement.appendChild(descriptionElement);
	pieceElement.appendChild(disponibiliteElement);
}

// Trier par prix croissant
const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");

boutonTrierCroissant.addEventListener("click", function () {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort(function (a, b) {
		return a.prix - b.prix;
	});
	console.log(piecesOrdonnees);
});

// Trier par prix décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");

boutonTrierDecroissant.addEventListener("click", function () {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort(function (a, b) {
		return b.prix - a.prix;
	});
	console.log(piecesOrdonnees);
});

// Filtrer les pièces abordables
const boutonFiltrerPrix = document.querySelector(".btn-filtrer-prix");

boutonFiltrerPrix.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return piece.prix <= 35;
	});
	console.log(piecesFiltrees);
});

// Filter les pièces sans descriptions
const boutonFiltrerDesc = document.querySelector(".btn-filtrer-desc");

boutonFiltrerDesc.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return piece.description;
	});
	console.log(piecesFiltrees);
});

// Pieces abordables
const noms = pieces.map((piece) => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].prix > 35) {
		noms.splice(i, 1);
	}
}
console.log(noms);

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

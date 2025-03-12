import { getPersonnages } from '../provider.js';

export async function loadListingSearch() {
    const persos = await getPersonnages();
    const searchInput = document.getElementById('recherche');
    const termesRecherche = searchInput.value.toLowerCase();
    const filteredPersos = persos.filter(p => p.nom.toLowerCase().includes(termesRecherche));
    
    const app = document.getElementById('app');
    const details = document.getElementById('details');
    
    details.innerHTML = '';
    if (filteredPersos.length === 0) {
        app.innerHTML = `<h1>Aucun personnage ne correspond à votre recherche : ${searchInput.value}</h1>`;
    } else {
        app.innerHTML = `<h1>Liste des Personnages correspondant à votre recherche : ${searchInput.value}</h1>` + filteredPersos.map(p =>
            `<div class="horizontal-card" onclick="route('detail', ${p.id})">`
            + `<img src="${p.image}" alt="${p.nom}">`
            + `<h2>${p.nom}</h2>`
            + `</div>`
        ).join('');
    }

    searchInput.value = '';
}

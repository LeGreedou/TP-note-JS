import { getPersonnages } from '../provider.js';

export async function loadListingSearch() {
    const persos = await getPersonnages();
    const searchInput = document.getElementById('recherche');
    console.log(searchInput);
    const termesRecherche = searchInput.value.toLowerCase();
    const filteredPersos = persos.filter(p => p.nom.toLowerCase().includes(termesRecherche));
    
    const app = document.getElementById('app');
    const details = document.getElementById('details');
    
    details.innerHTML = '';
    app.innerHTML = '<h1>Liste des Personnages</h1>' + filteredPersos.map(p =>
        `<div class="horizontal-card" onclick="route('detail', ${p.id})">`
        + `<img src="${p.image}" alt="${p.nom}">`
        + `<h2>${p.nom}</h2>`
        + `</div>`
    ).join('');
}

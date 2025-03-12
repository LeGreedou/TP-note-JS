import { getPersonnages } from '../provider.js';

export async function loadListing() {
    const persos = await getPersonnages();
    
    const app = document.getElementById('app');
    const details = document.getElementById('details');
    
    details.innerHTML = '';
    app.innerHTML = '<h1>Liste des Personnages de League of Legends</h1>' + persos.map(p =>
        `<div class="horizontal-card" onclick="route('detail', ${p.id})">`
        + `<img src="${p.image}" alt="${p.nom}">`
        + `<h2>${p.nom}</h2>`
        + `</div>`
    ).join('');
}

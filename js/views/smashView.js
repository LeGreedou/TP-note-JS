import { getSmash } from '../services/smashService.js';

export async function loadSmash(hideDetails = true) {
    const smash = getSmash();
    
    const app = document.getElementById('app');

    if (hideDetails) {
        const details = document.getElementById('details');
        details.innerHTML = '';
    }

    app.innerHTML = '<h1>Liste des Personnages Smashed</h1>' + smash.map(p =>
        `<div id='${p.id}' class="horizontal-card" onclick="route('detail', ${p.id})">`
        + `<img src="${p.image}" alt="${p.nom}">`
        + `<h2>${p.nom}</h2>`
        + `</div>`
    ).join('');
}
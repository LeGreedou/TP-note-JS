import { getPass } from '../services/passService.js';

export async function loadPass(hideDetails = true) {
    const pass = getPass();
    
    const app = document.getElementById('app');

    if (hideDetails) {
        const details = document.getElementById('details');
        details.innerHTML = '';
    }

    app.innerHTML = '<h1>Liste des Personnages Pass</h1>' + pass.map(p =>
        `<div id='${p.id}' class="horizontal-card" onclick="route('detail', ${p.id})">`
        + `<img src="${p.image}" alt="${p.nom}">`
        + `<h2>${p.nom}</h2>`
        + `</div>`
    ).join('');
}
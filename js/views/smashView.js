import { getSmash } from '../services/smashService.js';
import { clearSmash } from '../services/resetService.js'

export async function loadSmash(hideDetails = true) {
    const smash = getSmash();
    
    const app = document.getElementById('app');

    if (hideDetails) {
        const details = document.getElementById('details');
        details.innerHTML = '';
    }

    app.innerHTML = `
    <div class="header">
        <h1>Liste des Personnages Smashed</h1>
        <button onclick="reinitialiserSmash()" id="reset">Réinitialiser</button>
    </div>
    ${smash.map(p =>
        `<div id='${p.id}' class="horizontal-card" onclick="route('detail', ${p.id})">`
        + `<img src="${p.image}" alt="${p.nom}">`
        + `<h2>${p.nom}</h2>`
        + `</div>`
    ).join('')}
`;
}

export function reinitialiserSmash() {
    clearSmash()
    console.log("del")
}

window.reinitialiserSmash = reinitialiserSmash;

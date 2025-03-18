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
        <p>Vous avez smashé ${smash.length} personnages</p>
        <button onclick="reinitialiserSmash()" id="reset">Réinitialiser</button>
        <div id="perso-list"></div><div id="pagination-container"></div>
    </div>`;

    $('#pagination-container').pagination({
        dataSource: smash,
        pageSize: 7,
        autoHidePrevious: true,
        autoHideNext: true,
        callback: function(data, pagination) {
            document.getElementById('perso-list').innerHTML = data.map(p =>
                `<div id='${p.id}' class="horizontal-card" onclick="route('detail', ${p.id})">`
                + `<img src="${p.image}" alt="${p.nom}">`
                + `<h2>${p.nom}</h2>`
                + `</div>`
            ).join('');
        }
    });
}

export function reinitialiserSmash() {
    clearSmash()
    console.log("del")
}

window.reinitialiserSmash = reinitialiserSmash;

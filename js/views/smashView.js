import { getSmash } from '../services/smashService.js';
import { clearSmash } from '../services/resetService.js'
import { hideDetails } from './detailView.js';

export async function loadSmash() {
    const smash = getSmash();
    hideDetails()
    const app = document.getElementById('app');

    app.innerHTML = `
    <div class="header">
        <h1>Liste des Personnages Smashed</h1>
        <p>Vous avez smashé ${smash.length} personnage(s)</p>
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
                + `<div class="image-container"> `
                + `<img src="${p.image}" alt="${p.nom}">`
                + `</div>`
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

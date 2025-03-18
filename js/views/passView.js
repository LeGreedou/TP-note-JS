import { getPass } from '../services/passService.js';
import { clearPass } from '../services/resetService.js'

export async function loadPass(hideDetails = true) {
    const pass = getPass();
    
    const app = document.getElementById('app');

    if (hideDetails) {
        const details = document.getElementById('details');
        details.innerHTML = '';
    }

    app.innerHTML = `
    <div class="header">
        <h1>Liste des Personnages Passed</h1>
        <button onclick="reinitialiserPass()" id="reset">Réinitialiser</button>
        <div id="perso-list"></div><div id="pagination-container"></div>
    </div>`;
    
    $('#pagination-container').pagination({
        dataSource: pass,
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

export function reinitialiserPass() {
    clearPass()
    console.log("del")
}

window.reinitialiserPass = reinitialiserPass;

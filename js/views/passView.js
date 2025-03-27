import { getPass } from '../services/passService.js';
import { clearPass } from '../services/resetService.js'
import { hideDetails } from './detailView.js';

export async function loadPass() {
    const pass = getPass();
    hideDetails()
    const app = document.getElementById('app');
    app.innerHTML = `
    <div class="header">
        <h1>Liste des Personnages Passed</h1>
        <p>Vous avez passé ${pass.length} personnage(s)</p>
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
                `<div id='${p.id}' class="horizontal-card" onclick="route('detail', ${p.id})">
                <div class="image-container"> 
                <img src="${p.image}" alt="${p.nom}">
                </div>
                <h2>${p.nom}</h2>
                </div>`
            ).join('');
        }
    });
}

export function reinitialiserPass() {
    clearPass()
    console.log("del")
}

window.reinitialiserPass = reinitialiserPass;

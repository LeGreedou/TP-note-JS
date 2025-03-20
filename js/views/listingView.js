import { getPersonnages } from '../provider.js';
import { hideDetails } from './detailView.js';

export async function loadListing() {
    const persos = await getPersonnages();
    
    const app = document.getElementById('app');
    hideDetails();    

    app.innerHTML = '<h1>Liste des Personnages de League of Legends</h1><div id="perso-list"></div><div id="pagination-container"></div>';       

    $('#pagination-container').pagination({
        dataSource: persos,
        pageSize: 10,
        autoHidePrevious: true,
        autoHideNext: true,
        callback: function(data, pagination) {
            document.getElementById('perso-list').innerHTML = data.map(p =>
                `<div class="horizontal-card" onclick="route('detail', ${p.id})">`
                + `<img src="${p.image}" alt="${p.nom}">`
                + `<h2>${p.nom}</h2>`
                + `</div>`
            ).join('');
        }
    });
}

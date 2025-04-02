import { getSearch } from '../provider.js';
import { hideDetails } from './detailView.js';
import { setupLazyLoading } from './genericView.js';


export async function loadListingSearch() {
    const searchInput = document.getElementById('recherche');
    const filteredPersos = await getSearch(searchInput.value);
    const app = document.getElementById('app');
    const details = document.getElementById('details');
    hideDetails();

    details.innerHTML = '';
    if (filteredPersos.length === 0) {
        app.innerHTML = `<h1>Aucun personnage ne correspond à votre recherche : ${searchInput.value}</h1>`;
    } else {
        app.innerHTML = `
            <h1>Liste des Personnages correspondant à votre recherche : ${searchInput.value}</h1>
            <div id="perso-list"></div>
            <div id="pagination-container"></div>
        `;

        $('#pagination-container').pagination({
            dataSource: filteredPersos,
            pageSize: 16,
            autoHidePrevious: true,
            autoHideNext: true,
            callback: function(data, pagination) {
                document.getElementById('perso-list').innerHTML = data.map(p =>
                    `<div class="horizontal-card" onclick="route('detail', ${p.id})">
                        <div class="image-container">
                            <img data-src="${p.image}" src="data/lol-logo.jpg" alt="${p.nom}" loading="lazy">
                        </div>
                        <h2>${p.nom}</h2>
                    </div>`
                ).join('');
                setupLazyLoading();
            }
        });
    }

    searchInput.value = '';
}

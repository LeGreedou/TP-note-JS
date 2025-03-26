import { getRegions } from '../provider.js';
import { hideDetails } from './listingRegionsView.js';

export async function loadRegions() {
    const regions = await getRegions();
    
    const app = document.getElementById('app');
    await hideDetails();    

    app.innerHTML = '<h1>Liste des Régions de League of Legends</h1><div id="region-list"></div><div id="pagination-container"></div>';       

    $('#pagination-container').pagination({
        dataSource: regions,
        pageSize: 7,
        autoHidePrevious: true,
        autoHideNext: true,
        callback: function(data, pagination) {
            document.getElementById('region-list').innerHTML = data.map(r =>
                `<div class="horizontal-card" onclick="route('listingRegions', ${r.id})">
                <h2>${r.nom}</h2>
                </div>`
            ).join('');
        }
    });
}

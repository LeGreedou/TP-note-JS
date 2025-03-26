import { getPersonnesByRegion } from '../provider.js';

export async function loadDetailRegions(id) {
    let persosRegion = await getPersonnesByRegion(id);

    document.getElementById("app").classList.remove("detailsRegion-inactive")
    document.getElementById("app").classList.add("detailsRegion-active")

    document.getElementById("detailsRegion").innerHTML = 
    `<span onclick="route('regions');" class='close-button material-symbols-rounded'>close</span>
    <div id="infos"></div><div id="pagination-regions"></div>`;

    $('#pagination-regions').pagination({
        dataSource: persosRegion,
        pageSize: 5,
        autoHidePrevious: true,
        autoHideNext: true,
        callback: function(data, pagination) {
            document.getElementById('infos').innerHTML = data.map(p =>
                `<div class="horizontal-card">`
                + `<div class="image-container"> `
                + `<img src="${p.image}" alt="${p.nom}">`
                + `</div>`
                + `<h2>${p.nom}</h2>`
                + `</div>`
            ).join('');
        }
    });
}

export async function hideDetails() {
    document.getElementById('detailsRegion').innerHTML = '';
    document.getElementById("app").classList.add("detailsRegion-inactive")
    document.getElementById("app").classList.remove("detailsRegion-active")
}
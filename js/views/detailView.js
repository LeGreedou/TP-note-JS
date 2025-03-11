import { getRegion, getPersonnage } from '../provider.js';

export async function loadDetail(id) {
    let perso = await getPersonnage(id);

    document.getElementById("details").innerHTML = 
    `<span onclick="route('listing');" class='close-button material-symbols-rounded'>close</span>`
    + `<img src="${perso.image}">`
    + "<section>"
    + `<h1>${perso.nom}</h1>`
    + `<p><strong>Region:</strong> ${(await getRegion(perso.id_region)).nom}</p>`
    + `<p><strong>Roles:</strong> ${await perso.role}</p>`
    + "</section>";
    };


export async function hideDetails() {
    document.getElementById('details').innerHTML = '';
}
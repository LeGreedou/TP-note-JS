import { getRegion, getPersonnage } from '../provider.js';
import { isSmashable, toggleSmash } from '../services/smashService.js';
import { isPassable, togglePass } from '../services/passService.js';

export async function loadDetail(id) {
    let perso = await getPersonnage(id);

    document.getElementById("details").innerHTML = 
    `<span onclick="route('listing');" class='close-button material-symbols-rounded'>close</span>`
    + `<img src="${perso.image}">`
    + "<section>"
    + `<h1>${perso.nom}</h1>`
    + `<span id='smash-button' class='material-symbols-rounded'>favorite</span>`
    + `<span id='pass-button' class='material-symbols-rounded'>prompt_suggestion</span>`
    + `<p><strong>Region:</strong> ${(await getRegion(perso.id_region)).nom}</p>`
    + `<p><strong>Roles:</strong> ${await perso.role}</p>`
    + "</section>";

    if (isSmashable(perso.id)) document.getElementById("smash-button").classList.add("filled");
    document.getElementById('smash-button').addEventListener('click', () => {
        toggleSmash(perso.id);
    });

    if (isPassable(perso.id)) document.getElementById("pass-button").classList.add("filled");
    document.getElementById('pass-button').addEventListener('click', () => {
        togglePass(perso.id);
    });
}

export async function hideDetails() {
    document.getElementById('details').innerHTML = '';
}
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
    + `<div class="button-container">`
    + `<button id="smash-button" type="button">Smash<span id="smash-logo" class='material-symbols-rounded'>favorite</span></button>`
    + `<button id="pass-button" type="button">Pass<span id="pass-logo" class='material-symbols-rounded'>do_not_disturb_on</span></button></div>`
    + `<p><strong>Region:</strong> ${(await getRegion(perso.id_region)).nom}</p>`
    + `<p><strong>Roles:</strong> ${await perso.role}</p>`
    + "</section>";

    if (isSmashable(perso.id)) document.getElementById("smash-logo").classList.add("filled");
    document.getElementById('smash-button').addEventListener('click', () => {
        toggleSmash(perso.id);
    });

    if (isPassable(perso.id)) document.getElementById("pass-logo").classList.add("filled");
    document.getElementById('pass-button').addEventListener('click', () => {
        togglePass(perso.id);
    });
}

export async function hideDetails() {
    document.getElementById('details').innerHTML = '';
}
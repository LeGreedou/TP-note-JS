import { getRegion, getPersonnage } from '../provider.js';
import { isSmashable, toggleSmash } from '../services/smashService.js';
import { isPassable, togglePass } from '../services/passService.js';
import { initializeRankSelection } from '../services/notesService.js';

export async function loadDetail(id) {
    let perso = await getPersonnage(id);
    let region = await getRegion(perso.id_region);

    document.getElementById("app").classList.remove("details-inactive")
    document.getElementById("app").classList.add("details-active")

    document.getElementById("details").innerHTML = 
    `<span onclick="route('listing');" class='close-button material-symbols-rounded'>close</span>`
    + `<img src="${perso.image}">`
    + "<section id='infos'>"
    + `<h1>${perso.nom}</h1>`
    + `<div class="button-container">`
    + `<button id="smash-button" type="button">Smash<span id="smash-logo" class='material-symbols-rounded'>favorite</span></button>`
    + `<button id="pass-button" type="button">Pass<span id="pass-logo" class='material-symbols-rounded'>do_not_disturb_on</span></button>`
    + `<strong><label for="note">Rank : </label></strong>`
    + `<select id="note" name="note" required>`
    + `<option id="option" value="S">S</option>`
    + `<option id="option" value="A">A</option>`
    + `<option id="option" value="B">B</option>`
    + `<option id="option" value="C">C</option>`
    + `<option id="option" value="D">D</option>`
    + `</select></div>`
    + `<p><strong>Region:</strong> ${(await getRegion(perso.id_region)).nom}</p>`
    + `<p><strong>Roles:</strong> ${await perso.role}</p>`
    + "</section>";

    document.getElementById("infos").style.background = region.background;
    document.getElementById("details").style.background = region.background;
    document.getElementById("smash-button").style.background = region.couleur;
    document.getElementById("pass-button").style.background = region.couleur;
    document.getElementById("note").style.background = region.couleur;

    if (isSmashable(perso.id)) document.getElementById("smash-logo").classList.add("filled");
    document.getElementById('smash-button').addEventListener('click', () => {
        toggleSmash(perso.id);
    });

    if (isPassable(perso.id)) document.getElementById("pass-logo").classList.add("filled");
    document.getElementById('pass-button').addEventListener('click', () => {
        togglePass(perso.id);
    });

    await initializeRankSelection(perso.id);

}

export async function hideDetails() {
    document.getElementById('details').innerHTML = '';
    document.getElementById("app").classList.add("details-inactive")
    document.getElementById("app").classList.remove("details-active")
}
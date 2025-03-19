import { getPersonnage } from '../provider.js';
import { hideDetails } from '../views/detailView.js';
import { togglePass, isPassable } from './passService.js';

export async function addSmash(id) {
    const smash = JSON.parse(localStorage.getItem('smash')) || [];
    const personnage = await getPersonnage(id);

    if (!smash.find(sm => sm.id === personnage.id)) {
        smash.push(personnage);
        if (await isPassable(id)){
            await togglePass(id);
        }
        localStorage.setItem('smash', JSON.stringify(smash));
    }
}

export function getSmash() {
    return JSON.parse(localStorage.getItem('smash')) || [];
}

export function removeSmash(id) {
    const smash = getSmash().filter(sm => sm.id !== id);
    localStorage.setItem('smash', JSON.stringify(smash));
}

export function isSmashable(id) {
    return getSmash().some(sm => sm.id === id);
}

export function toggleSmash(id) {
    if (getSmash().find(sm => sm.id === id)) {
        removeSmash(id);

        document.getElementById("smash-logo").classList.remove("filled")
        
        if (document.getElementById(id)) {
            document.getElementById(id).remove();
            hideDetails()
        }
    } else {
        document.getElementById("smash-logo").classList.add("filled");
        addSmash(id);
    }
}
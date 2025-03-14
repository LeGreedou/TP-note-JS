import { getPersonnage } from '../provider.js';
import { hideDetails } from '../views/detailView.js';

export async function addSmash(id) {
    const smash = JSON.parse(localStorage.getItem('smash')) || [];
    const personnage = await getPersonnage(id);

    if (!smash.find(sm => sm.id === personnage.id)) {
        smash.push(personnage);
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

        document.getElementById("smash-button").classList.remove("filled")
        
        if (document.getElementById(id)) {
            document.getElementById(id).remove();
            hideDetails()
        }
    } else {
        document.getElementById("smash-button").classList.add("filled");
        addSmash(id);
    }
}
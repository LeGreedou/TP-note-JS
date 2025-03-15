import { getPersonnage } from '../provider.js';
import { hideDetails } from '../views/detailView.js';

export async function addPass(id) {
    const pass = JSON.parse(localStorage.getItem('pass')) || [];
    const personnage = await getPersonnage(id);

    if (!pass.find(ps => ps.id === personnage.id)) {
        pass.push(personnage);
        localStorage.setItem('pass', JSON.stringify(pass));
    }
}

export function getPass() {
    return JSON.parse(localStorage.getItem('pass')) || [];
}

export function removePass(id) {
    const pass = getPass().filter(ps => ps.id !== id);
    localStorage.setItem('pass', JSON.stringify(pass));
}

export function isPassable(id) {
    return getPass().some(ps => ps.id === id);
}

export function togglePass(id) {
    if (getPass().find(ps => ps.id === id)) {
        removePass(id);

        document.getElementById("pass-logo").classList.remove("filled")
        
        if (document.getElementById(id)) {
            document.getElementById(id).remove();
            hideDetails()
        }
    } else {
        document.getElementById("pass-logo").classList.add("filled");
        addPass(id);
    }
}
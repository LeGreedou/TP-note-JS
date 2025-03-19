import { getPersonnage } from '../provider.js';
import { hideDetails } from '../views/detailView.js';

async function getUserIP() {
    try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'adresse IP :", error);
        return null;
    }
}

export async function addRank(id, rank) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const personnage = await getPersonnage(id);
    const userIP = await getUserIP();
    
    if (!userIP) return;

    let existingEntry = notes.find(note => note.id === personnage.id && note.ip === userIP);
    if (existingEntry) {
        existingEntry.rank = rank;
    } else {
        notes.push({ id: personnage.id, rank, ip: userIP });
    }
    
    localStorage.setItem('notes', JSON.stringify(notes));
}

export function getRanks() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

export async function getRank(id) {
    const userIP = await getUserIP();
    if (!userIP) return null;

    const note = getRanks().find(note => note.id === id && note.ip === userIP);
    return note ? note.rank : null;
}

export async function removeRank(id) {
    const userIP = await getUserIP();
    if (!userIP) return;

    const notes = getRanks().filter(note => !(note.id === id && note.ip === userIP));
    localStorage.setItem('notes', JSON.stringify(notes));
}

export async function toggleRank(id, rank) {
    const currentRank = await getRank(id);
    if (currentRank !== null) {
        await removeRank(id);
        document.getElementById("rank-logo").classList.remove("filled");

        if (document.getElementById(id)) {
            document.getElementById(id).remove();
            hideDetails();
        }
    } else {
        document.getElementById("rank-logo").classList.add("filled");
        await addRank(id, rank);
    }
}

export async function initializeRankSelection(id) {
    const rankDropdown = document.getElementById("note");
    if (!rankDropdown) return;
    
    const currentRank = await getRank(id);
    if (currentRank) {
        rankDropdown.value = currentRank;
    }
    
    rankDropdown.addEventListener("change", async (event) => {
        const selectedRank = event.target.value;
        await addRank(id, selectedRank);
    });
}

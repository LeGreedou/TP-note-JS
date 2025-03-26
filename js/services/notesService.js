import { getPersonnage } from '../provider.js';
import { hideDetails } from '../views/detailView.js';
import { ENDPOINT } from '../config.js';

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
    const userIP = await getUserIP();
    if (!userIP) return;

    const personnage = await getPersonnage(id);
    if (!personnage) return;

    if (!personnage.notes) {
        personnage.notes = [];
    }

    const existingEntry = personnage.notes.find(note => note.ip === userIP);
    if (existingEntry) {
        existingEntry.rank = rank;
    } else {
        personnage.notes.push({ ip: userIP, rank });
    }

    await fetch(`${ENDPOINT}/personnages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: personnage.notes }),
    });
}

export async function getRank(id) {
    const userIP = await getUserIP();
    if (!userIP) return null;

    const personnage = await getPersonnage(id);
    if (!personnage || !personnage.notes) return null;

    const note = personnage.notes.find(note => note.ip === userIP);
    return note ? note.rank : null;
}

export async function removeRank(id) {
    const userIP = await getUserIP();
    if (!userIP) return;

    const personnage = await getPersonnage(id);
    if (!personnage || !personnage.notes) return;

    personnage.notes = personnage.notes.filter(note => note.ip !== userIP);

    await fetch(`${ENDPOINT}/personnages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: personnage.notes }),
    });
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

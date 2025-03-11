import { ENDPOINT } from './config.js';

export async function getPersonnages() {
    const response = await fetch(`${ENDPOINT}/personnages`);
    return response.json();
}

export async function getPersonnage(id) {
    const response = await fetch(`${ENDPOINT}/personnages/${id}`);
    return response.json();
}

export async function getRegions() {
    const response = await fetch(`${ENDPOINT}/regions`);
    return response.json();
}

export async function getRegion(id) {
    const response = await fetch(`${ENDPOINT}/regions/${id}`);
    return response.json();
}

import { ENDPOINT } from './config.js';
import Champion from "./models/champion.js";
import Region from "./models/region.js";


export async function getPersonnages() {
    const response = await fetch(`${ENDPOINT}/personnages`);
    const data = await response.json();
    const characters = data.map(c => new Champion(c.id, c.nom, c.image, c.region, c.role));
    return characters;
}

export async function getPersonnage(id) {
    const response = await fetch(`${ENDPOINT}/personnages/${id}`);
    return response.json();
}

export async function getRegions() {
    const response = await fetch(`${ENDPOINT}/regions`);
    const data = await response.json();
    const regions = data.map(r => new Region(r.id, r.nom));
    return regions;
}

export async function getRegion(id) {
    const response = await fetch(`${ENDPOINT}/regions/${id}`);
    const data = await response.json();
    return new Region(data.id, data.nom);
}

export async function getSearch(search) {
    const response = await fetch(`${ENDPOINT}/personnages?nom_like=${search}`)
    const data = await response.json();
    const characters = data.map(c => new Champion(c.id, c.nom, c.image, c.region, c.role));
    return characters;
}


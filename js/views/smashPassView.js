import { getPersonnages } from '../provider.js';
import { addSmash } from '../services/smashService.js';
import { addPass } from '../services/passService.js';
import { hideDetails } from './detailView.js';

let currentIndex = 0;
let personnages = [];

export async function loadSmashPass() {
    hideDetails()
    personnages = await getPersonnages();
    displayCurrentPersonnage();
}

function displayCurrentPersonnage() {
    const app = document.getElementById('app');
    
    // Vérifier s'il reste des personnages
    if (currentIndex < personnages.length) {
        const personnage = personnages[currentIndex];
        const progress = ((currentIndex + 1) / personnages.length) * 100;
        
        app.innerHTML = `
            <div class="smash-pass-container">
                <h1>Smash or Pass</h1>
                <div class="character-card">
                    <section>    
                        <img src="${personnage.image}" alt="${personnage.nom}" loading="lazy">
                        <h2>${personnage.nom}</h2>
                    </section>
                    <section> 
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${progress}%;"></div>
                        </div>
                    </section>
                </div>
                <div class="action-buttons">
                    <button onclick="smashPersonnage(${personnage.id})" class="smash-button">Smash</button>
                    <button onclick="passPersonnage(${personnage.id})" class="pass-button">Pass</button>
                </div>
            </div>
        `;
    } else {
        // Plus de personnages à afficher
        app.innerHTML = `
            <div class="smash-pass-container">
                <h1>Terminé !</h1>
                <p>Vous avez parcouru tous les personnages.</p>
                <div class="action-buttons">
                    <button onclick="resetSmashPass()" class="reset-button">Recommencer</button>
                    <button onclick="route('listing')" class="back-button">Retour à la liste</button>
                </div>
            </div>
        `;
    }
}

// Gestion des touches du clavier
document.addEventListener('keydown', (event) => {
    if (currentIndex < personnages.length) {
        const personnage = personnages[currentIndex];

        if (event.key === 'ArrowLeft') {
            smashPersonnage(personnage.id);
        } else if (event.key === 'ArrowRight') {
            passPersonnage(personnage.id);
        }
    }
});



// Fonction pour le Smash
export function smashPersonnage(id) {
    addSmash(id);
    currentIndex++;
    displayCurrentPersonnage();
}

// Fonction pour le Pass
export function passPersonnage(id) {
    addPass(id);
    currentIndex++;
    displayCurrentPersonnage();
}

// Pour recommencer
export function resetSmashPass() {
    currentIndex = 0;
    displayCurrentPersonnage();
}
export function clearSmash() {
    localStorage.removeItem('smash'); // Supprime les personnages du stockage local

    // Supprime les éléments du DOM s'ils existent
    const smashList = document.getElementById('app'); 
    if (smashList) {
        smashList.innerHTML = `
            <div class="header">
                <h1>Liste des Personnages Smashed</h1>
                <button id="resetButton" class="reset">Réinitialiser</button>
            </div>
            <p>Aucun personnage dans la liste.</p>
        `;
    }

    console.log("Tous les personnages ont été supprimés !");
}

export function clearPass() {
    localStorage.removeItem('pass'); // Supprime les personnages du stockage local

    // Supprime les éléments du DOM s'ils existent
    const passList = document.getElementById('app'); 
    if (passList) {
        passList.innerHTML = `
            <div class="header">
                <h1>Liste des Personnages Passed</h1>
                <button id="resetButton" class="reset">Réinitialiser</button>
            </div>
            <p>Aucun personnage dans la liste.</p>
        `;
    }

    console.log("Tous les personnages ont été supprimés !");
}

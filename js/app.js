import { loadDetail } from './views/detailView.js';
import { loadSmashPass, smashPersonnage, passPersonnage, resetSmashPass } from './views/smashPassView.js';
import { loadListing } from './views/listingView.js';
import { loadListingSearch } from './views/listingViewSearch.js';
import { loadPass } from './views/passView.js';
import { loadSmash } from './views/smashView.js';
import { loadRegions } from './views/regionsView.js';
import { loadDetailRegions } from './views/listingRegionsView.js';

// Ajoutez ces fonctions à la portée globale
window.smashPersonnage = smashPersonnage;
window.passPersonnage = passPersonnage;
window.resetSmashPass = resetSmashPass;

// Dans votre fonction de routage, ajoutez ces cases
function route(page, id) {
    switch(page) {
        case 'listing':
            loadListing();
            break
        case 'detail':
            loadDetail(id)
            break
        case 'search':
            loadListingSearch()
            break
        case 'smash':
            loadSmash()
            break
        case 'smashorpass':
            loadSmashPass();
            break;
        case 'pass':
            loadPass();
            break;
        case 'regions':
            loadRegions();
            break;
        case 'listingRegions':
            loadDetailRegions(id);
            break;
    }
}

// Rendez la fonction route disponible globalement
window.route = route;
route("listing")
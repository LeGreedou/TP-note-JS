import { loadDetail } from './views/detailView.js';
import { loadSmashPass, smashPersonnage, passPersonnage, resetSmashPass } from './views/smashPassView.js';
import { loadListing } from './views/listingView.js';
import { loadListingSearch } from './views/listingViewSearch.js';
import { loadPass } from './views/passView.js';
import { loadSmash } from './views/smashView.js';
import { loadTierList } from './views/tierListView.js';

window.smashPersonnage = smashPersonnage;
window.passPersonnage = passPersonnage;
window.resetSmashPass = resetSmashPass;

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
        case 'tierlist':
            loadTierList();
            break;
    }
}

window.route = route;
route("listing")
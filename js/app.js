import { loadDetail } from './views/detailView.js';
import { loadListing } from './views/listingView.js';
import { loadListingSearch } from './views/listingViewSearch.js';
import { loadPass } from './views/passView.js';
import { loadSmash } from './views/smashView.js';

export function route(view, id = null) {
    if (view === 'listing') loadListing();
    if (view === 'detail' && id) loadDetail(id);
    if (view === 'search') loadListingSearch();
    if (view === 'smash') loadSmash();
    if (view === 'pass') loadPass();
}

window.route = route;
route('listing');

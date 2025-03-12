import { loadDetail } from './views/detailView.js';
import { loadListing } from './views/listingView.js';
import { loadListingSearch } from './views/listingViewSearch.js';

export function route(view, id = null) {
    if (view === 'listing') loadListing();
    if (view === 'detail' && id) loadDetail(id);
    if (view === 'search') loadListingSearch();
}

window.route = route;
route('listing');

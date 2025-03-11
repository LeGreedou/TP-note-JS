import { loadDetail } from './views/detailView.js';
import { loadListing } from './views/listingView.js';

export function route(view, id = null) {
    if (view === 'listing') loadListing();
    if (view === 'detail' && id) loadDetail(id);
}

window.route = route;
route('listing');

import Home from './views/Home.js';
import LegalNotice from './views/LegalNotice.js';

const routes = {
    '/': Home,
    '/legalnotice': LegalNotice
    // '/articles': ,
    // '/articles/:id': ,
};

const router = async () => {

    const content = null || document.querySelector('#content');

    console.log(location.pathname);

    const current = new routes[location.pathname];

    console.log(current);

    content.innerHTML = await current.render();
}

window.addEventListener('load', router);
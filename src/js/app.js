import { siteData } from './data/manageSiteState.js'
import { render, addListeners, removeListeners } from './service/renderComponent.js'
import DashboardView from './views/DashboardView.js'
import ItemView from './views/ItemView.js'
import LoginView from './views/LoginView.js'
import { NotFoundPageView } from './views/NotFoundPageView.js'



const navigateTo = url => {
    if (url !== location.pathname) {
        history.pushState(null, null, url)
        router()
    }
}

const getCurrentRoute = () => {
    const routes = [
        { path: '/', view: DashboardView }, // 0
        { path: '/login', view: LoginView }, //1
        { path: '/item/create', view: ItemView }, //2
        { path: '/item/update', view: ItemView }, //3
    ]

    const routeMatches = routes.map(route => ({
        route,
        isMatch: location.pathname === route.path
    }))

    const is_item_edit_path = location.pathname.split('/item/update/').length == 2;

    if (is_item_edit_path)
        return {
            route: routes[3],
            isMatch: true
        }

    return routeMatches.find(match => match.isMatch)

}

const router = () => {
    let currentRoute = getCurrentRoute()
    if (!currentRoute) {
        history.pushState(null, null, '/404')
        currentRoute = {
            route: {
                path: '/404',
                view: NotFoundPageView
            },
            isMatch: true
        }
    } else if (!siteData.isLogin) {
        history.pushState(null, null, '/login')
        currentRoute = {
            route: {
                path: '/login',
                view: LoginView
            },
            isMatch: true
        }
    }

    removeListeners()
    render(currentRoute.route.view)
    addListeners()
}

window.addEventListener("popstate", (event) => {
    if (/\/item\/update/.test(location.pathname) || /\/item\/create/.test(location.pathname))
        navigateTo('/')
    else
        router()
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
})

export { navigateTo };
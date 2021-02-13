import routes from "components/routes.js"

function loadMainContent() {
    let page;

    window.onhashchange = () => {
        window.location.hash[]
        page = routes[]
    }
}

loadMainContent();
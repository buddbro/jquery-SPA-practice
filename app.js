async function loadMainContent() {
    window.onhashchange = async () => {
        let route = window.location.hash.split("?")[0];
        let movie = window.location.hash.split("?")[1];
        page = await routes[route](movie);

        if(!page) {
            page = routes["#error"]()
        }

        $(".app").html(page);
    }
}

loadMainContent();
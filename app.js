async function loadMainContent() {
    window.onhashchange = async () => {
        let route = window.location.hash.split("?")[0];
        page = await routes[route]();

        if(!page) {
            page = routes["#error"]()
        }

        $(".app").html(page);
    }
}

loadMainContent();
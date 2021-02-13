async function getMovies() {
    return await $.getJSON("data/filmer.json");
}

async function getScreenings() {
    let data = await $.getJSON("data/visningar.json");
    console.log(data);
}

async function getRooms() {
    let data = await $.getJSON("data/salonger.json");
    console.log(data);
}
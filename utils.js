async function getMovies() {
    return await $.getJSON("data/filmer.json");
}

async function getScreenings() {
    return await $.getJSON("data/visningar.json");
}

async function getRooms() {
    return await $.getJSON("data/salonger.json");
}

async function getBookings() {
    return await $.getJSON("data/bookings.json");
}

async function saveToDatabase(data) {
    let bookings = await getBookings();
    bookings.push(data);

    console.log("Saved to database", data);
}
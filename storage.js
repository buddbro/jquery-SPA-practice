let storage = {
    selectedSeats: [],
    selectedScreening: {},
    selectedMovie: "",
    movies: [],
    screenings: [],
    bookings: [],
    selectedRoom: {}
}

async function initStorage() {
    storage.movies = await getMovies();
    storage.screenings = await getScreenings();
    storage.rooms = await getRooms();
    storage.bookings = await getBookings();
}

initStorage();
const routes = {
    "": () => `<div>start</div>`,
    "#error": () => "<div>error</div>",
    "#movies": async () => {
        let movies = await getMovies()
        let html = `<div><h2>Movies</h2>`

        movies.forEach(movie => {
            let url = `#detailedView?${encodeURI(movie.title)}`
            html = html + `<a href="${url}"><h3>${movie.title}</h3></a>`
        })

        html = html + `</div>`

        return html
    },
    "#detailedView": async () => {
        let movie = storage.movies.filter(mov => mov.title === decodeURI(window.location.hash.split("?")[1]))[0]
        storage.selectedMovie = movie.title;
        return `<div><h3>${movie.title}</h3><button onclick="appendAvailableScreenings()">Screenings</button><div class="screenings"></div></div>`
    }
}
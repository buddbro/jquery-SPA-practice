const routes = {
    "": () => `<div>start</div>`,
    "#error": () => "<div>error</div>",
    "#movies": async () => {
        let movies = await getMovies()
        let html = `<div><h2>Movies</h2>`

        movies.forEach(movie => {
            let url = `#detailedView?${movie.title}`
            html = html + `<a href="${url}"><h3>${movie.title}</h3></a>`
        })

        html = html + `</div>`

        return html
    },
    "#detailedView": async (movieTitleInput) => {
        let movies = await getMovies()
        let movie = movies.filter(mov => mov.title === movieTitleInput.replace(/%20/g, " "))[0]
        return `<div>${movie.title}</div>`
    }
}
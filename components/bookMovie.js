async function appendAvailableScreenings() {
    let movie = storage.selectedMovie;
    let screenings = {};
    storage.screenings.filter(scr => scr.film === movie).forEach(scr => screenings[scr.date] = screenings[scr.date] ? [...screenings[scr.date], {...scr}] : [{...scr}]);

    let html = `<div>`
    for (const [key, value] of Object.entries(screenings)) {
        let innerHtml = "";
        value.forEach(val => {
            innerHtml = innerHtml + `<li onclick="appendAvailableSeats('${val.film}', '${val.time}', '${val.biograf}', '${val.date}')">${val.time} ${val.biograf}</li>`
        })
        html = html + `<div>${key}<ul>${innerHtml}</ul></div>`
    }
    html = html + `</div>`
    $(".screenings").html(html)

}

function selectSeat(seatNr) {
    storage.selectedSeats.includes(seatNr) ? storage.selectedSeats = storage.selectedSeats.filter(nr => nr !== seatNr) : storage.selectedSeats.push(seatNr)
    let html = "";
    storage.selectedSeats.forEach(seat => html = html + `<div>[${seat}]</div>`)
    let btn = document.createElement(`button`)
    btn.onclick = bookSeats
    btn.innerHTML = "Book seats"
    $(".selectedSeats").html(html);
    $(".selectedSeats").append(btn);
}


async function appendAvailableSeats(title, time, room, date) {
    storage.selectedScreening = {title, time, room, date};
    let rooms = await getRooms();
    storage.selectedRoom = rooms.filter(r => r.name === room)[0]
    
    let html = `<div class="seats"><div>Selected seats: <div class="selectedSeats"></div></div>`

    let seatNr = 1;
    storage.selectedRoom.seatsPerRow.forEach(rowSize => {
        html = html + `<div class="seatRow">`
        for(let i = 0; i < rowSize; i++) {
            html = html + `<div onclick="selectSeat('${seatNr}')">[${seatNr}]</div>`
            seatNr++;
        }
        html = html + `</div></br>`
    })
html = html + `</div>`
    $(".screenings").html(html);
}

function bookSeats() {
    alert(`You booked ${storage.selectedSeats.length} seats for ${storage.selectedScreening.title} in ${storage.selectedScreening.room} on ${storage.selectedScreening.date} ${storage.selectedScreening.time}`)
    let selectedSeats = storage.selectedSeats;
    let screening = storage.selectedScreening;
    saveToDatabase({selectedSeats, ...screening});
}
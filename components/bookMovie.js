async function appendAvailableScreenings(movieTitle) {
    let allScreenings = await getScreenings();
    let screenings = {};
    rawScreenings = allScreenings.filter(scr => scr.film === movieTitle).forEach(scr => screenings[scr.date] = screenings[scr.date] ? [...screenings[scr.date], {...scr}] : [{...scr}]);
    //console.log(screenings);
    
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
    selectedSeats.includes(seatNr) ? selectedSeats = selectedSeats.filter(nr => nr !== seatNr) : selectedSeats.push(seatNr)
    let html = "";
    selectedSeats.forEach(seat => html = html + `<div>[${seat}]</div>`)
    let btn = document.createElement(`button`)
    btn.onclick = bookSeats
    btn.innerHTML = "Book seats"
    $(".selectedSeats").html(html);
    $(".selectedSeats").append(btn);
}


async function appendAvailableSeats(title, time, room, date) {
    screening = {title, time, room, date};
    let rooms = await getRooms();
    let chosenRoom = rooms.filter(r => r.name === room)[0]
    
    let html = `<div class="seats"><div>Selected seats: <div class="selectedSeats"></div></div>`

    let seatNr = 1;
    chosenRoom.seatsPerRow.forEach(rowSize => {
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
    alert(`You booked ${selectedSeats.length} seats for ${screening.title} in ${screening.room} on ${screening.date} ${screening.time}`)
    saveToDatabase({selectedSeats, ...screening});
}
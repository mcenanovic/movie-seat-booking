const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const price = document.getElementById('price');
const selectedMovie = document.getElementById('movie');

populateUI();

let ticketPrice = +selectedMovie.value;

// Update selected seats and total price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('seatsIndex', JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  price.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  const seatsIndex = JSON.parse(localStorage.getItem('seatsIndex'));

  if (seatsIndex !== null && seatsIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (seatsIndex.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    selectedMovie.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
selectedMovie.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  localStorage.setItem('selectedMovieIndex', e.target.selectedIndex);
  updateSelectedCount();
});

// Seat select event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && 
  !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

updateSelectedCount();
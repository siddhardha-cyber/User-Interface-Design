// -------------------------
// Variables
// -------------------------

let selectedMovie = "";
let selectedTime = "";
let selectedSeats = 0;

const ticketPrice = 200;

// Pages
const homePage = document.getElementById("homePage");
const timePage = document.getElementById("timePage");
const seatPage = document.getElementById("seatPage");
const successPage = document.getElementById("successPage");

// Elements
const selectedMovieHeading =
    document.getElementById("selectedMovie");

const summaryMovie =
    document.getElementById("summaryMovie");

const summaryTime =
    document.getElementById("summaryTime");

const seatCount =
    document.getElementById("seatCount");

const totalPrice =
    document.getElementById("totalPrice");

const confirmBtn =
    document.getElementById("confirmBtn");

const successMessage =
    document.getElementById("successMessage");

// -------------------------
// Movie Selection
// -------------------------

function bookMovie(movieName)
{
    selectedMovie = movieName;

    selectedMovieHeading.textContent =
        movieName;

    homePage.style.display = "none";
    timePage.style.display = "block";
}

// -------------------------
// Time Selection
// -------------------------

function selectTime(time, button)
{
    selectedTime = time;

    document.querySelectorAll(".time-btn")
    .forEach(btn =>
    {
        btn.style.background = "#457b9d";
    });

    button.style.background = "#e63946";
}

// -------------------------
// Go To Seat Page
// -------------------------

function goToSeats()
{
    if(selectedTime === "")
    {
        alert("Please select a show time");
        return;
    }

    summaryMovie.textContent =
        selectedMovie;

    summaryTime.textContent =
        selectedTime;

    timePage.style.display = "none";
    seatPage.style.display = "block";
}

// -------------------------
// Seat Selection
// -------------------------

const seats =
    document.querySelectorAll(".seat");

seats.forEach(seat =>
{
    seat.addEventListener("click", () =>
    {
        if(
            seat.classList.contains("booked")
        )
        {
            return;
        }

        seat.classList.toggle("selected");

        selectedSeats =
            document.querySelectorAll(
                ".seat.selected"
            ).length;

        seatCount.textContent =
            selectedSeats;

        totalPrice.textContent =
            selectedSeats * ticketPrice;
    });
});

// -------------------------
// Confirm Booking
// -------------------------

confirmBtn.addEventListener("click", () =>
{
    if(selectedSeats === 0)
    {
        alert(
            "Please select at least one seat"
        );
        return;
    }

    const selectedSeatElements =
        document.querySelectorAll(
            ".seat.selected"
        );

    selectedSeatElements.forEach(seat =>
    {
        seat.classList.remove(
            "selected"
        );

        seat.classList.add(
            "booked"
        );
    });

    seatPage.style.display = "none";
    successPage.style.display = "block";

    successMessage.innerHTML =
        `
        <strong>Movie:</strong>
        ${selectedMovie}
        <br><br>

        <strong>Show Time:</strong>
        ${selectedTime}
        <br><br>

        <strong>Seats:</strong>
        ${selectedSeats}
        <br><br>

        <strong>Total Amount:</strong>
        ₹${selectedSeats * ticketPrice}
        `;
});

// -------------------------
// Search Movies
// -------------------------

const searchBox =
    document.getElementById("searchBox");

searchBox.addEventListener("keyup", () =>
{
    const searchValue =
        searchBox.value.toLowerCase();

    const movieCards =
        document.querySelectorAll(
            ".movie-card"
        );

    movieCards.forEach(card =>
    {
        const movieName =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

        if(
            movieName.includes(searchValue)
        )
        {
            card.style.display =
                "block";
        }
        else
        {
            card.style.display =
                "none";
        }
    });
});
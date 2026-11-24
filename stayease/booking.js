/* Booking page
   1. Pre-select the apartment from the link (booking.html?apartment=luxury)
   2. Block past dates and check-out dates that are not after check-in
   3. Show "nights x price = total"
   4. Validate the form before "sending" */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  const apartmentSelect = document.getElementById("apartment");
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const bookingSummary = document.getElementById("bookingSummary");
  const bookingSuccess = document.getElementById("bookingSuccess");
  const guestsSelect = document.getElementById("guests");

  // Date helpers: yyyy-mm-dd is the format <input type="date"> uses.
  // We build it from local date parts (not toISOString) so the visitor's
  // own "today" is used, not the UTC day.
  function toInputDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return date.getFullYear() + "-" + month + "-" + day;
  }

  function fromInputDate(value) {
    const parts = value.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function nightsBetween(checkin, checkout) {
    const msPerDay = 24 * 60 * 60 * 1000;
    // round() because a day can be 23 or 25 hours when the clocks change
    return Math.round((checkout - checkin) / msPerDay);
  }

  // 1. Pre-select the apartment from the URL
  const wantedApartment = new URLSearchParams(window.location.search).get(
    "apartment",
  );

  if (wantedApartment) {
    const exists = Array.from(apartmentSelect.options).some(function (option) {
      return option.value === wantedApartment;
    });

    if (exists) {
      apartmentSelect.value = wantedApartment;
    }
  }

  // 2. Date limits
  const today = new Date();
  checkinInput.min = toInputDate(today);

  function updateCheckoutMin() {
    const earliestCheckout = checkinInput.value
      ? addDays(fromInputDate(checkinInput.value), 1)
      : addDays(today, 1);

    checkoutInput.min = toInputDate(earliestCheckout);
  }

  // 3. Price summary
  function updateSummary() {
    const selectedOption = apartmentSelect.selectedOptions[0];
    const price = selectedOption ? Number(selectedOption.dataset.price) : 0;

    if (!price || !checkinInput.value || !checkoutInput.value) {
      bookingSummary.classList.add("d-none");
      return;
    }

    const nights = nightsBetween(
      fromInputDate(checkinInput.value),
      fromInputDate(checkoutInput.value),
    );

    if (nights < 1) {
      bookingSummary.classList.add("d-none");
      return;
    }

    const nightsText = nights === 1 ? "1 night" : nights + " nights";

    bookingSummary.textContent =
      nightsText + " \u00D7 $" + price + " = $" + nights * price + " total";
    bookingSummary.classList.remove("d-none");
  }

  // 3b. Limit the guests to what the chosen apartment can hold
  function updateGuests() {
    const selectedOption = apartmentSelect.selectedOptions[0];
    const max = selectedOption ? Number(selectedOption.dataset.max) || 5 : 5;

    Array.from(guestsSelect.options).forEach(function (option) {
      option.disabled = Number(option.value) > max;
    });

    // If the old choice is now too high, drop it to the maximum
    if (Number(guestsSelect.value) > max) {
      guestsSelect.value = String(max);
    }
  }

  updateCheckoutMin();
  updateSummary();
  updateGuests();

  apartmentSelect.addEventListener("change", updateSummary);
  apartmentSelect.addEventListener("change", updateGuests);

  checkinInput.addEventListener("input", function () {
    updateCheckoutMin();
    updateSummary();
  });

  checkoutInput.addEventListener("input", updateSummary);

  // Start editing again -> hide the old success message
  bookingForm.addEventListener("input", function () {
    bookingSuccess.classList.add("d-none");
  });

  // 4. Validation + submit
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    bookingSuccess.classList.add("d-none");

    if (!bookingForm.checkValidity()) {
      // was-validated makes Bootstrap show the red messages
      bookingForm.classList.add("was-validated");
      bookingForm.querySelector(":invalid").focus();
      return;
    }

    // No server yet, so nothing is really sent - we only confirm to the visitor
    bookingForm.reset();
    bookingForm.classList.remove("was-validated");
    updateCheckoutMin();
    updateSummary();
    updateGuests();
    bookingSuccess.classList.remove("d-none");
  });
}

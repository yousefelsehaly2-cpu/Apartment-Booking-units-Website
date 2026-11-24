const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const successMessage = document.getElementById("successMessage");
  const messageCount = document.getElementById("messageCount");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // One small check per field: true means the value is OK
  function isNameValid() {
    return nameInput.value.trim().length >= 2;
  }

  function isEmailValid() {
    return emailPattern.test(emailInput.value.trim());
  }

  function isMessageValid() {
    return messageInput.value.trim().length >= 10;
  }

  // Bootstrap shows the red message under a field that has .is-invalid
  function showError(field, hasError) {
    field.classList.toggle("is-invalid", hasError);
  }

  // Show how many characters were typed; turns green once the minimum is reached
  function updateCounter() {
    const length = messageInput.value.trim().length;
    messageCount.textContent = length + " / 10 minimum";
    messageCount.classList.toggle("text-success", length >= 10);
  }

  messageInput.addEventListener("input", function () {
    if (isMessageValid()) showError(messageInput, false);
    updateCounter();
  });

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameOk = isNameValid();
    const emailOk = isEmailValid();
    const messageOk = isMessageValid();

    showError(nameInput, !nameOk);
    showError(emailInput, !emailOk);
    showError(messageInput, !messageOk);

    // Check All Fields
    if (nameOk && emailOk && messageOk) {
      // No server yet, so nothing is really sent - we only confirm to the visitor
      contactForm.reset();
      updateCounter();
      successMessage.classList.remove("d-none");
    } else {
      successMessage.classList.add("d-none");

      // Send the keyboard to the first field that needs fixing
      contactForm.querySelector(".is-invalid").focus();
    }
  });

  // Remove the error while typing, as soon as the field becomes valid
  nameInput.addEventListener("input", function () {
    if (isNameValid()) showError(nameInput, false);
  });

  emailInput.addEventListener("input", function () {
    if (isEmailValid()) showError(emailInput, false);
  });

  messageInput.addEventListener("input", function () {
    if (isMessageValid()) showError(messageInput, false);
  });

  // Hide the success message as soon as the visitor starts typing again
  contactForm.addEventListener("input", function () {
    successMessage.classList.add("d-none");
  });
}

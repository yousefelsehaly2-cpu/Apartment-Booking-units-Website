/* Register page
   - Uses the browser's built-in rules from the HTML (required, minlength, type="email")
   - Adds one rule of our own: Confirm Password must match Password */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm-password");
  const registerSuccess = document.getElementById("registerSuccess");

  // An empty custom message means "valid"; any text means "invalid"
  function checkPasswordsMatch() {
    const mismatch =
      confirmInput.value !== "" && confirmInput.value !== passwordInput.value;

    confirmInput.setCustomValidity(mismatch ? "Passwords do not match" : "");
  }

  passwordInput.addEventListener("input", checkPasswordsMatch);
  confirmInput.addEventListener("input", checkPasswordsMatch);

  // Show / hide both password fields with one button
  const toggleButton = document.getElementById("togglePasswords");

  toggleButton.addEventListener("click", function () {
    const show = passwordInput.type === "password";

    passwordInput.type = show ? "text" : "password";
    confirmInput.type = show ? "text" : "password";
    toggleButton.textContent = show ? "Hide passwords" : "Show passwords";
  });

  // Start editing again -> hide the old success message
  registerForm.addEventListener("input", function () {
    registerSuccess.classList.add("d-none");
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    registerSuccess.classList.add("d-none");
    checkPasswordsMatch();

    if (!registerForm.checkValidity()) {
      // was-validated makes Bootstrap show the red messages
      registerForm.classList.add("was-validated");
      registerForm.querySelector(":invalid").focus();
      return;
    }

    // No server yet, so nothing is really saved - we only confirm to the visitor
    registerForm.reset();
    registerForm.classList.remove("was-validated");
    checkPasswordsMatch();
    registerSuccess.classList.remove("d-none");
  });
}

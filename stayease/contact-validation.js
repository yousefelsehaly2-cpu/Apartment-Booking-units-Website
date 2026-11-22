const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("project-description");
    const successMessage = document.getElementById("successMessage");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let valid = true;

        // Name Validation
        if (name.value.trim().length < 2) {
            name.classList.add("is-invalid");
            valid = false;
        } else {
            name.classList.remove("is-invalid");
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            email.classList.add("is-invalid");
            valid = false;
        } else {
            email.classList.remove("is-invalid");
        }

        // Message Validation
        if (message.value.trim().length < 10) {
            message.classList.add("is-invalid");
            valid = false;
        } else {
            message.classList.remove("is-invalid");
        }

        // Check All Fields
        if (valid) {
            successMessage.classList.remove("d-none");
            contactForm.reset();

            name.classList.remove("is-invalid");
            email.classList.remove("is-invalid");
            message.classList.remove("is-invalid");
        } else {
            successMessage.classList.add("d-none");
        }

    });

    // Remove error while typing
    name.addEventListener("input", function () {
        if (name.value.trim().length >= 2) {
            name.classList.remove("is-invalid");
        }
    });

    email.addEventListener("input", function () {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailPattern.test(email.value.trim())) {
            email.classList.remove("is-invalid");
        }
    });

    message.addEventListener("input", function () {
        if (message.value.trim().length >= 10) {
            message.classList.remove("is-invalid");
        }
    });

}

const themeBtn = document.getElementById("themeBtn");

let savedTheme = localStorage.getItem("theme") || "light";

document.documentElement.setAttribute("data-theme", savedTheme);

if (themeBtn) {

    updateButton();

    themeBtn.addEventListener("click", function () {

        let currentTheme = document.documentElement.getAttribute("data-theme");

        let newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);

        localStorage.setItem("theme", newTheme);

        updateButton();

    });

}

function updateButton() {

    if (!themeBtn) return;

    let currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }

}

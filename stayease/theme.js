/* Light / dark theme for every page.
   This file is loaded in the <head>, so the saved theme is applied
   before the page is drawn (no white flash when you open a page in dark mode). */

const themeRoot = document.documentElement;

function getSavedTheme() {
  try {
    return localStorage.getItem("theme") || "light";
  } catch (error) {
    // localStorage can be blocked (private mode, some file:// setups)
    return "light";
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // ignore - the theme just won't be remembered
  }
}

// Bootstrap 5.3 reads data-bs-theme and restyles its components for us
themeRoot.setAttribute("data-bs-theme", getSavedTheme());

// The button only exists after the page has loaded
document.addEventListener("DOMContentLoaded", function () {
  const themeBtn = document.getElementById("themeBtn");

  if (!themeBtn) return;

  function updateButton() {
    const isDark = themeRoot.getAttribute("data-bs-theme") === "dark";
    themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  updateButton();

  themeBtn.addEventListener("click", function () {
    const isDark = themeRoot.getAttribute("data-bs-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";

    themeRoot.setAttribute("data-bs-theme", newTheme);
    saveTheme(newTheme);
    updateButton();
  });
});

const themeToggleButton = document.getElementById("theme-toggle");
const mobileThemeToggleButton = document.getElementById("mobile-theme-toggle");

const toggleTheme = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
  const gradient = document.createElement("div");
  gradient.className = "theme-transition";
  document.body.appendChild(gradient);
  setTimeout(() => {
    gradient.remove();
  }, 1000);
  document.body.style.backgroundColor = document.body.classList.contains("dark") ? "#1a202c" : "#f7fafc";
};

themeToggleButton.addEventListener("click", toggleTheme);
mobileThemeToggleButton.addEventListener("click", toggleTheme);

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  document.body.style.backgroundColor = "#1a202c";
} else {
  document.body.classList.remove("dark");
  document.body.style.backgroundColor = "#f7fafc";
}

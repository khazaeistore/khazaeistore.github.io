const themeToggle = document.getElementById("theme-toggle");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

const updateScrollbarColors = () => {
  const isDark = document.body.classList.contains("dark");
  document.documentElement.style.setProperty(
    "--scrollbar-track",
    isDark ? "#1f2937" : "#f3f4f6"
  );
  document.documentElement.style.setProperty(
    "--scrollbar-thumb",
    isDark ? "#4b5563" : "#94a3b8"
  );
  document.documentElement.style.setProperty(
    "--scrollbar-thumb-hover",
    isDark ? "#6b7280" : "#64748b"
  );
};

const toggleTheme = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
  updateScrollbarColors();
  const gradient = document.createElement("div");
  gradient.className = "theme-transition";
  document.body.appendChild(gradient);
  setTimeout(() => {
    gradient.remove();
  }, 1000);
  document.body.style.backgroundColor = document.body.classList.contains("dark") ? "#1a202c" : "#f7fafc";
};

themeToggle.addEventListener("click", toggleTheme);
mobileThemeToggle.addEventListener("click", toggleTheme);

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  document.body.style.backgroundColor = "#1a202c";
  updateScrollbarColors();
} else {
  document.body.classList.remove("dark");
  document.body.style.backgroundColor = "#f7fafc";
  updateScrollbarColors();
}

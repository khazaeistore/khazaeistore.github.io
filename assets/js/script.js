const themeToggle = document.getElementById("theme-toggle");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

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

themeToggle.addEventListener("click", toggleTheme);
mobileThemeToggle.addEventListener("click", toggleTheme);

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  document.body.style.backgroundColor = "#1a202c";
} else {
  document.body.classList.remove("dark");
  document.body.style.backgroundColor = "#f7fafc";
}

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const toggleMobileMenu = () => {
  mobileMenu.classList.toggle("hidden");
  gsap.fromTo(mobileMenu, { opacity: 0 }, { opacity: 1, duration: 0.5 });
};
menuToggle.addEventListener("click", toggleMobileMenu);

fetch("/assets/data/categories.json")
  .then((response) => response.json())
  .then((categories) => {
    const categoriesContainer = document.getElementById("categories");
    const firstCategoryId = categories[0].id;

    categories.forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add(
        "text-center",
        "cursor-pointer",
        "p-4",
        "rounded",
        "transition",
        "transform",
        "hover:scale-105",
        "category-item",
        "animated",
        "dark:text-white",
      );
      categoryDiv.innerHTML = `
        <img src="${category.image}" class="w-16 h-16 rounded-full mx-auto">
        <p class="mt-2 text-gray-800 dark:text-white">${category.name}</p>
      `;
      categoryDiv.addEventListener("click", () => {
        loadProductsByCategory(category.id);
      });
      categoriesContainer.appendChild(categoryDiv);
    });

    loadProductsByCategory(firstCategoryId);
  });

function loadProductsByCategory(categoryId) {
  fetch("/assets/data/products.json")
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("product-list");
      productList.innerHTML = "";

      products
        .filter((product) => product.category_id === categoryId)
        .forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add(
            "bg-white",
            "dark:bg-gray-800",
            "p-4",
            "rounded-lg",
            "shadow",
            "transition",
            "transform",
            "hover:scale-105",
            "text-gray-800",
            "dark:text-white",
            "animated"
          );

          const productImage = document.createElement("img");
          productImage.src = product.image;
          productImage.classList.add(
            "w-full",
            "h-48",
            "object-cover",
            "rounded-lg"
          );

          const productTitle = document.createElement("h3");
          productTitle.textContent = product.title;
          productTitle.classList.add(
            "text-xl",
            "font-bold",
            "mt-4",
            "text-gray-800",
            "dark:text-white"
          );

          const productDescription = document.createElement("p");
          productDescription.textContent = product.description;
          productDescription.classList.add(
            "mt-2",
            "text-gray-800",
            "dark:text-white"
          );

          const productPrice = document.createElement("p");
          productPrice.textContent = `${product.price} تومان`;
          productPrice.classList.add("mt-2", "text-green-500", "font-bold");

          productCard.appendChild(productImage);
          productCard.appendChild(productTitle);
          productCard.appendChild(productDescription);
          productCard.appendChild(productPrice);
          productCard.addEventListener("click", () => {
            window.location.href = `product.html?id=${product.id}`;
          });
          productList.appendChild(productCard);
        });
    });
}

function updateDateTime() {
  const now = new Date();

  const weekdayOptions = { weekday: "long" };
  const weekday = now.toLocaleDateString("fa-IR", weekdayOptions);

  const day = now.getDate();
  const monthOptions = { month: "long" };
  const month = now.toLocaleDateString("fa-IR", monthOptions);
  const year = now.toLocaleDateString("fa-IR", { year: "numeric" }).split(' ')[0];

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const formattedHours = hours.toString();
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  function convertToPersianDigits(str) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    return str.replace(/\d/g, (digit) => persianDigits[digit]);
  }

  const dateTime = `${weekday} ${convertToPersianDigits(day.toString())} ${month} ${convertToPersianDigits(year)} ساعت ${convertToPersianDigits(formattedHours)}:${convertToPersianDigits(formattedMinutes)}:${convertToPersianDigits(formattedSeconds)}`;

  document.getElementById("date-time").textContent = dateTime;
}

updateDateTime();
setInterval(updateDateTime, 1000);

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchResultsContent = document.getElementById("search-results-content");
const closeSearchResults = document.getElementById("close-search-results");

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const query = searchInput.value.toLowerCase();
    fetch("/assets/data/products.json")
      .then((response) => response.json())
      .then((products) => {
        searchResultsContent.innerHTML = "";
        const filteredProducts = products.filter(
          (product) =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        if (filteredProducts.length > 0) {
          filteredProducts.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add(
              "bg-white",
              "dark:bg-gray-800",
              "p-4",
              "rounded-lg",
              "shadow",
              "transition",
              "transform",
              "hover:scale-105",
              "text-gray-800",
              "dark:text-white",
              "animated"
            );
            productCard.innerHTML = `
              <img src="${product.image}" class="w-full h-48 object-cover rounded-lg">
              <h3 class="text-xl font-bold mt-4 text-gray-800 dark:text-white">${product.title}</h3>
              <p class="mt-2 text-gray-800 dark:text-white">${product.description}</p>
              <p class="mt-2 text-green-500 font-bold">${product.price} تومان</p>
            `;
            productCard.addEventListener("click", () => {
              window.location.href = `product.html?id=${product.id}`;
            });
            searchResultsContent.appendChild(productCard);
          });
          searchResults.classList.remove("hidden");
          gsap.from("#search-results", { duration: 1, y: 50, opacity: 0, ease: "power2.out" });
        } else {
          searchResultsContent.innerHTML =
            '<p class="text-center text-gray-800 dark:text-white">محصولی یافت نشد.</p>';
          searchResults.classList.remove("hidden");
        }
      });
  }
});

closeSearchResults.addEventListener("click", () => {
  searchResults.classList.add("hidden");
});

const themeToggle = document.getElementById("theme-toggle");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

const toggleTheme = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

themeToggle.addEventListener("click", toggleTheme);
mobileThemeToggle.addEventListener("click", toggleTheme);

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}

const languageToggle = document.getElementById("language-toggle");
const languageDropdown = document.getElementById("language-dropdown");
const mobileLanguageToggle = document.getElementById("mobile-language-toggle");
const mobileLanguageDropdown = document.getElementById(
  "mobile-language-dropdown"
);

const toggleLanguageMenu = () => {
  languageDropdown.classList.toggle("hidden");
};
languageToggle.addEventListener("click", toggleLanguageMenu);
mobileLanguageToggle.addEventListener("click", toggleLanguageMenu);

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const toggleMobileMenu = () => {
  mobileMenu.classList.toggle("hidden");
};
menuToggle.addEventListener("click", toggleMobileMenu);

fetch("/assets/data/category.json")
  .then((response) => response.json())
  .then((categories) => {
    const categoriesContainer = document.getElementById("categories");
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);

    categories.forEach((category, index) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add(
        "text-center",
        "cursor-pointer",
        "p-4",
        "rounded",
        "transition",
        "transform",
        "hover:scale-105"
      );
      categoryDiv.innerHTML = `
                <img src="${category.image}" class="w-16 h-16 rounded-full mx-auto">
                <p class="mt-2 text-gray-800 dark:text-white">${category.name}</p>
            `;
      categoryDiv.addEventListener("click", () => {
        loadProductsByCategory(category.id);
      });
      categoriesContainer.appendChild(categoryDiv);

      if (index === randomCategoryIndex) {
        loadProductsByCategory(category.id);
      }
    });
  });

function loadProductsByCategory(categoryId) {
  fetch("/assets/data/product.json")
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
            "dark:text-white"
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
          productList.appendChild(productCard);
        });
    });
}

function updateDateTime() {
  const now = new Date();
  const dateTime = now.toLocaleString("fa-IR", {
    dateStyle: "full",
    timeStyle: "short",
  });
  document.getElementById("date-time").textContent = dateTime;
}

setInterval(updateDateTime, 1000);
updateDateTime();

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchResultsContent = document.getElementById("search-results-content");
const closeSearchResults = document.getElementById("close-search-results");

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const query = searchInput.value.toLowerCase();
    fetch("/assets/data/product.json")
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
              "dark:text-white"
            );
            productCard.innerHTML = `
                            <img src="${product.image}" class="w-full h-48 object-cover rounded-lg">
                            <h3 class="text-xl font-bold mt-4 text-gray-800 dark:text-white">${product.title}</h3>
                            <p class="mt-2 text-gray-800 dark:text-white">${product.description}</p>
                            <p class="mt-2 text-green-500 font-bold">${product.price} تومان</p>
                        `;
            searchResultsContent.appendChild(productCard);
          });
          searchResults.classList.remove("hidden");
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

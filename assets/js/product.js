document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        fetch("/assets/data/products.json")
            .then((response) => response.json())
            .then((products) => {
                const product = products.find((p) => p.id == productId);
                if (product) {
                    document.getElementById("product-image").src = product.image;
                    document.getElementById("product-title").textContent = product.title;
                    document.getElementById("product-description").textContent = product.description;
                    document.getElementById("product-price").textContent = `${product.price} تومان`;
                    document.getElementById("product-weight").textContent = `وزن: ${product.Weight || 'نامشخص'}`;
                    document.getElementById("product-quantity").textContent = `موجودی: ${product.quantity}`;
                } else {
                    document.getElementById("product-details").innerHTML = "<p class='text-center text-gray-800 dark:text-white'>محصولی یافت نشد.</p>";
                }
            });
    } else {
        document.getElementById("product-details").innerHTML = "<p class='text-center text-gray-800 dark:text-white'>محصولی یافت نشد.</p>";
    }
});

const products = [
  { name: "Smartphone", category: "electronics", price: 30000, rating: 4.5 },
  { name: "Jeans", category: "fashion", price: 2000, rating: 4.0 },
  { name: "Laptop", category: "electronics", price: 55000, rating: 4.7 },
  { name: "T-shirt", category: "fashion", price: 800, rating: 3.9 },
  { name: "Novel", category: "books", price: 500, rating: 4.8 },
  { name: "Headphones", category: "electronics", price: 2500, rating: 4.3 },
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");

function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: ₹${product.price}</p>
      <p>Rating: ⭐ ${product.rating}</p>
    `;
    productList.appendChild(div);
  });
}

function applyFiltersAndSort() {
  let filtered = [...products];

  // Filter by category
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  // Sort by criteria
  const sortValue = sortBy.value;
  if (sortValue === "priceLowHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "priceHighLow") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === "ratingHighLow") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filtered);
}

categoryFilter.addEventListener("change", applyFiltersAndSort);
sortBy.addEventListener("change", applyFiltersAndSort);

// Initial load
displayProducts(products);

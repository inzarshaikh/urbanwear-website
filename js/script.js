// Sample product array
const products = [
  { id: 1, name: "Classic White Shirt", price: 25.99, category: "shirt", image: "images/shirt1.jpg" },
  { id: 2, name: "Blue Denim Jacket", price: 49.99, category: "jacket", image: "images/jacket1.jpg" },
  { id: 3, name: "Red Dress", price: 39.99, category: "dress", image: "images/dress1.jpg" },
  { id: 4, name: "Sporty Sneakers", price: 59.99, category: "shoes", image: "images/shoes1.jpg" },
  { id: 5, name: "Black Leather Jacket", price: 79.99, category: "jacket", image: "images/jacket2.jpg" },
  { id: 6, name: "Summer T-Shirt", price: 19.99, category: "shirt", image: "images/shirt2.jpg" },
  { id: 7, name: "Elegant Dress", price: 59.99, category: "dress", image: "images/dress2.jpg" },
  { id: 8, name: "Running Shoes", price: 49.99, category: "shoes", image: "images/shoes2.jpg" }
];

// Function to display products
function displayProducts(productList) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = "";
  productList.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("col-md-3", "mb-4");
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price.toFixed(2)}</p>
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    productContainer.appendChild(card);
  });

  // Attach event listener to Add to Cart buttons
  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id);
    });
  });
}

// Filter by category
const categoryFilter = document.getElementById("categoryFilter");
if(categoryFilter) {
  categoryFilter.addEventListener("change", () => {
    const selected = categoryFilter.value;
    const filtered = selected === "all" ? products : products.filter(p => p.category === selected);
    displayProducts(filtered);
  });
}

// Search by name
const searchInput = document.getElementById("searchInput");
if(searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
  });
}

// LocalStorage cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart function
function addToCart(id) {
  const product = products.find(p => p.id == id);
  const exist = cart.find(item => item.id == id);
  if(exist) {
    exist.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Initialize product listing
if(document.getElementById("product-list")) {
  displayProducts(products);
}

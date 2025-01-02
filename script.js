// DOM Elements
const cartCount = document.querySelector('.cart');
const filterCategory = document.getElementById('category');
const sortOption = document.getElementById('sort');
const productGrid = document.querySelector('.product-grid');
const navLinks = document.querySelectorAll('.main-nav a');
const newsletterForm = document.querySelector('.newsletter form');

// Initialize cart as an empty array
let cart = [];

// Sample product data
const products = [
  { name: 'Wireless Headphones', category: 'tech accessories', price: 59.99, rating: 4.5, img: 'photos/headphones.jpeg' },
  { name: 'Smartphone', category: 'smartphones', price: 599.99, rating: 4.8, img: 'photos/smartphone.jpeg' },
  { name: 'Gaming Laptop', category: 'laptops', price: 2899.99, rating: 4.7, img: 'photos/laptop.jpeg' },
  { name: 'Smartwatch', category: 'wearables', price: 129.99, rating: 4.3, img: 'photos/smartwatch.jpeg' },
];

// Utility function to render products in the grid
function renderProducts(filteredProducts) {
  if (!productGrid) {
    console.error("Product grid not found in the DOM.");
    return;
  }

  productGrid.innerHTML = ''; // Clear existing products

  filteredProducts.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>${product.price.toFixed(2)} DT</p>
        <button class="btn">Add to Cart</button>
      </div>
    `;

    productGrid.appendChild(productCard);

    // Add to Cart functionality
    productCard.querySelector('.btn').addEventListener('click', () => addToCart(product));
  });
}

// Add to cart functionality
function addToCart(product) {
  cart.push(product);
  updateCartCount();
  alert(`${product.name} has been added to the cart!`);


}

// Update cart count in the UI
function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = `Cart (${cart.length})`;

  } else {
    console.error("Cart element not found in the DOM.");
  }
}

// Filter products based on category
function filterProducts() {
  if (filterCategory) {
    filterCategory.addEventListener('change', () => {
      const category = filterCategory.value;
      const filteredProducts =
        category === 'all'
          ? products
          : products.filter((product) => product.category === category);

      renderProducts(filteredProducts);
    });
  } else {
    console.error("Filter category dropdown not found in the DOM.");
  }
}

// Sort products based on price or rating
function sortProducts() {
  if (sortOption) {
    sortOption.addEventListener('change', () => {
      const sortBy = sortOption.value;
      const sortedProducts = [...products]; // Create a copy of the array

      if (sortBy === 'price-low-to-high') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high-to-low') {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating-high-to-low') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
      }

      renderProducts(sortedProducts);
    });
  } else {
    console.error("Sort option dropdown not found in the DOM.");
  }
}

// Handle navigation link clicks
function handleNavigation() {
  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error(`Section ${targetId} not found in the DOM.`);

        }
      });
    });
  } else {
    console.error("Navigation links not found in the DOM.");
  }
}

// Handle newsletter form submission
function handleNewsletter() {
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailInput = newsletterForm.querySelector('#email');
      const feedback = newsletterForm.querySelector('.feedback');

      if (emailInput && feedback) {
        feedback.textContent = `Thank you for subscribing, ${emailInput.value}!`;
        feedback.style.color = 'green';

        setTimeout(() => {
          feedback.textContent = '';
          emailInput.value = '';
        }, 3000);
      } else {
        console.error("Email input or feedback element not found in the DOM.");
      }
    });
  } else {
    console.error("Newsletter form not found in the DOM.");
  }
}

// Initialize the app
function init() {
  renderProducts(products); // Render initial product list
  updateCartCount(); // Update cart count
  filterProducts(); // Setup product filtering
  sortProducts(); // Setup product sorting
  handleNavigation(); // Setup navigation behavior
  handleNewsletter(); // Setup newsletter behavior
}

// Safely initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
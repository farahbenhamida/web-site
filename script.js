// DOM Elements
const cartCount = document.querySelector('.cart');
const filterCategory = document.getElementById('category');
const sortOption = document.getElementById('sort');
const productGrid = document.querySelector('.product-grid');
const newsletterForm = document.querySelector('.newsletter form');

// Initialize cart
let cart = [];

// Sample products
const products = [
  { name: 'Wireless Headphones', category: 'tech accessories', price: 59.99, rating: 4.5, img: 'PH/headphones.jpeg' },
  { name: 'Smartphone', category: 'smartphones', price: 599.99, rating: 4.8, img: 'PH/smartphone.jpeg' },
  { name: 'Gaming Laptop', category: 'laptops', price: 2899.99, rating: 4.7, img: 'PH/laptop.jpeg' },
  { name: 'Smartwatch', category: 'wearables', price: 129.99, rating: 4.3, img: 'PH/smartwatch.jpeg' },
];

// Render products
function renderProducts(filteredProducts) {
  productGrid.innerHTML = '';
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>${product.price.toFixed(2)} DT</p>
        <label>Qty: <input type="number" min="1" value="1"></label>
        <button class="btn">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(productCard);
    productCard.querySelector('.btn').addEventListener('click', () => {
      const quantity = parseInt(productCard.querySelector('input').value, 10);
      addToCart(product, quantity);
    });
  });
}

// Add to cart
function addToCart(product, quantity) {
  const existingProduct = cart.find(item => item.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = `Cart (${totalItems})`;
}

// Filter products
function filterProducts() {
  const category = filterCategory.value;
  const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
  renderProducts(filteredProducts);
}

// Sort products
function sortProducts() {
  const sortBy = sortOption.value;
  const sortedProducts = [...products];
  if (sortBy === 'price-low-to-high') sortedProducts.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high-to-low') sortedProducts.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating-high-to-low') sortedProducts.sort((a, b) => b.rating - a.rating);
  renderProducts(sortedProducts);
}

// Newsletter form submission
newsletterForm.addEventListener('submit', event => {
  event.preventDefault();
  const email = newsletterForm.querySelector('#email').value;
  const feedback = newsletterForm.querySelector('.feedback');
  feedback.textContent = `Thank you for subscribing, ${email}!`;
  setTimeout(() => (feedback.textContent = ''), 3000);
});

// Event listeners
filterCategory.addEventListener('change', filterProducts);
sortOption.addEventListener('change', sortProducts);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  updateCartCount();
});

// -------------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
  // Function to increment and decrement quantity
  $('.increment').click(function () {
    var quantityElement = $(this).siblings('.quantity-value');
    var quantity = parseInt(quantityElement.text());
    quantityElement.text(quantity + 1);
  });

  $('.decrement').click(function () {
    var quantityElement = $(this).siblings('.quantity-value');
    var quantity = parseInt(quantityElement.text());
    if (quantity > 1) {
      quantityElement.text(quantity - 1);
    }
  });

  // Function to add product to cart and navigate to cart page
  $('.add-to-cart-btn').click(function () {
    var productCard = $(this).closest('.product-card');
    var productName = productCard.find('.product-name').text();
    var productPrice = parseFloat(productCard.find('.ogPrice').text().replace('₹', ''));
    var quantity = parseInt(productCard.find('.quantity-value').text());
    var productImage = productCard.find('.product-image').attr('src'); // Get the product image URL

    // Add product details to localStorage
    var cartItem = {
      name: productName,
      price: productPrice,
      quantity: quantity,
      image: productImage // Store the product image URL
    };

    // Check if cart already exists in localStorage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Navigate to cart page
    window.location.href = 'cart.html';
  });
});

// JavaScript code
document.addEventListener("DOMContentLoaded", function() {
  var viewDetailsButtons = document.querySelectorAll('.view-details-btn');
  viewDetailsButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var detailsContainer = this.closest('.product-card').querySelector('.product-additional-details');
      detailsContainer.classList.toggle('show-details');
      if (detailsContainer.classList.contains('show-details')) {
        this.textContent = 'Hide Details';
      } else {
        this.textContent = 'View Details';
      }
    });
  });
});

// ----------------------------------------------------------------------------------------------------------------------
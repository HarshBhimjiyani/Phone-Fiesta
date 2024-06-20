$(document).ready(function () {
  // Function to update the cart in localStorage
  function updateCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Function to load cart data from localStorage
  function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Function to calculate the total price of items in the cart
  function calculateTotal(cart) {
    return cart.reduce(function (total, item) {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);
  }

  //

  function calculateGST(subtotal) {
    return subtotal * 0.18;
  }

  // Update renderCart function to display subtotal, GST, and total
  // function renderCart() {
  //   var cart = loadCart();
  //   var cartSection = $(".cart_section .container .row .col-md-8");
  //   var cartSummary = $(".chk_summary .cart_summary");
  //   var subtotal = 0;
  //   var consolidatedCart = {};

  //   cart.forEach(function (item) {
  //     if (!consolidatedCart[item.name]) {
  //       consolidatedCart[item.name] = item;
  //     } else {
  //       consolidatedCart[item.name].quantity += item.quantity;
  //     }
  //   });

  //   cartSection.empty();

  //   if (Object.keys(consolidatedCart).length === 0) {
  //     cartSection.append('<p class="checkout_title" >Your cart is empty.</p>');
  //     // Disable checkout button if cart is empty
  //     $("#checkoutBtn").prop("disabled", true);
  //     $("#checkoutBtn").css("background-color", "black");
  //   } else {
  //     Object.values(consolidatedCart).forEach(function (item) {
  //       var itemTotal = parseFloat(item.price) * parseInt(item.quantity);
  //       subtotal += itemTotal;
        // cartSection.append(
        //   '<div class="cart_item" >' +
        //     '<div class="row">' +
        //     '<div class="col-md-3">' +
        //     '<img src="' +
        //     item.image +
        //     '" alt="Product Image">' +
        //     "</div>" +
        //     '<div class="col-md-3 itemss">' +
        //     "<h4>" +
        //     item.name +
        //     "</h4>" +
        //     "<span>" +
        //     item.description +
        //     "</span>" +
        //     "</div>" +
        //     '<div class="col-md-2 itemsprice">' +
        //     "<span>₹ " +
        //     item.price +
        //     "</span>" +
        //     "</div>" +
        //     '<div class="col-md-2.5">' +
        //     '<button class="btn btn-secondary decrement-btn" data-name="' +
        //     item.name +
        //     '">-</button>' +
        //     '<span class="quantity qtycart">' +
        //     item.quantity +
        //     "</span>" +
        //     '<button class="btn btn-primary increment-btn" data-name="' +
        //     item.name +
        //     '">+</button>' +
        //     "</div>" +
        //     '<div class="col-md-1">' +
        //     '<button class="btn btn-danger remove-btn" data-name="' +
        //     item.name +
        //     '">Remove</button>' +
        //     "</div>" +
        //     "</div>" +
        //     "</div>"
        // );
  //     });
  //     // Calculate GST
  //     var GST = calculateGST(subtotal);
  //     var total = subtotal + GST;

  //     // Enable checkout button if cart has items
  //     $("#checkoutBtn").prop("disabled", false);
  //   }

  //   // Update subtotal in the cart
  //   $(".subtotal #subamt").text("₹ " + subtotal.toFixed(2));

  //   // Update gst in the cart
  //   $(".gst #gstamt").text("₹ " + GST.toFixed(2));

  //   // Update total in the cart
  //   $(".total #amt").text("₹ " + total.toFixed(2));
  // }

  function renderCart() {
    var cart = loadCart();
    var cartSection = $(".cart_section .container .row .col-md-8");
    var cartSummary = $(".chk_summary .cart_summary");
    var subtotal = 0;
    var consolidatedCart = {};

    cart.forEach(function (item) {
      if (!consolidatedCart[item.name]) {
        consolidatedCart[item.name] = item;
      } else {
        consolidatedCart[item.name].quantity += item.quantity;
      }
    });

    cartSection.empty();

    if (Object.keys(consolidatedCart).length === 0) {
      cartSection.append('<p class="checkout_title" >Your cart is empty.</p>');
      // Disable checkout button if cart is empty
      $("#checkoutBtn").prop("disabled", true);
      $("#checkoutBtn").css("background-color", "black");

      // Set subtotal, GST, and total to 0 when cart is empty
      $(".subtotal #subamt").text("₹ 0.00");
      $(".gst #gstamt").text("₹ 0.00");
      $(".total #amt").text("₹ 0.00");
    } else {
      // Calculate subtotal if cart is not empty
      Object.values(consolidatedCart).forEach(function (item) {
        var itemTotal = parseFloat(item.price) * parseInt(item.quantity);
        subtotal += itemTotal;
        cartSection.append(
          '<div class="cart_item" >' +
            '<div class="row">' +
            '<div class="col-md-3">' +
            '<img src="' +
            item.image +
            '" alt="Product Image">' +
            "</div>" +
            '<div class="col-md-3 itemss">' +
            "<h4>" +
            item.name +
            "</h4>" +
            "<span>" +
            item.description +
            "</span>" +
            "</div>" +
            '<div class="col-md-2 itemsprice">' +
            "<span>₹ " +
            item.price +
            "</span>" +
            "</div>" +
            '<div class="col-md-2.5">' +
            '<button class="btn btn-secondary decrement-btn" data-name="' +
            item.name +
            '">-</button>' +
            '<span class="quantity qtycart">' +
            item.quantity +
            "</span>" +
            '<button class="btn btn-primary increment-btn" data-name="' +
            item.name +
            '">+</button>' +
            "</div>" +
            '<div class="col-md-1">' +
            '<button class="btn btn-danger remove-btn" data-name="' +
            item.name +
            '">Remove</button>' +
            "</div>" +
            "</div>" +
            "</div>"
        );
      });
      // Calculate GST and total if cart is not empty
      var GST = calculateGST(subtotal);
      var total = subtotal + GST;

      // Enable checkout button if cart has items
      $("#checkoutBtn").prop("disabled", false);

      // Update subtotal, GST, and total in the cart
      $(".subtotal #subamt").text("₹ " + subtotal.toFixed(2));
      $(".gst #gstamt").text("₹ " + GST.toFixed(2));
      $(".total #amt").text("₹ " + total.toFixed(2));
    }
  }

  // Load cart data and render cart when the page is loaded
  renderCart();

  // Add click event handler to increment button
  $(document).on("click", ".increment-btn", function () {
    var name = $(this).data("name");
    var cart = loadCart();
    cart.forEach(function (item) {
      if (item.name === name) {
        item.quantity += 1; // Increment by 1
      }
    });
    updateCart(cart); // Update cart in localStorage
    renderCart(); // Render updated cart
  });

  // // Add click event handler to decrement button
  $(document).on("click", ".decrement-btn", function () {
    var name = $(this).data("name");
    var cart = loadCart();
    cart.forEach(function (item) {
      if (item.name === name && item.quantity > 1) {
        item.quantity -= 1; // Decrement by 1
      }
    });
    updateCart(cart); // Update cart in localStorage
    renderCart(); // Render updated cart
  });

  // Add click event handler to remove button
  $(document).on("click", ".remove-btn", function () {
    var name = $(this).data("name");
    var cart = loadCart().filter(function (item) {
      return item.name !== name;
    });
    updateCart(cart); // Update cart in localStorage
    renderCart(); // Render updated cart
  });

  // Function to clear the cart
  function clearCart() {
    localStorage.removeItem("cart");
    renderCart(); // Render empty cart
  }

  // Add click event handler to clear cart button (if applicable)
  // $('#clear-cart-btn').click(clearCart);
});

// Retrieve cart items and store them in session storage when checkout button is clicked
document.getElementById("checkoutBtn").addEventListener("click", function () {
  var cartItems = []; // Assume you have the cart items stored in an array
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems)); // Store cart items in session storage
  window.location.href = "checkout.html"; // Redirect to checkout page
});

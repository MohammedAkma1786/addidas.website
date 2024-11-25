document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector("#cart-icon");
  const cart = document.querySelector(".cart");
  const closeCart = document.querySelector("#close-cart");
  const btnBuy = document.querySelector(".btn-buy");
  const cartContent = document.querySelector(".cart-content");
  const totalPriceElem = document.querySelector(".total-price");
  const cartCountElem = document.querySelector("#cart-count");

  const toggleCartVisibility = (isVisible) => {
    cart.classList.toggle("active", isVisible);
  };

  const updateCartCount = () => {
    const cartItemsCount = cartContent.querySelectorAll(".cart-box").length;
    cartCountElem.innerText = cartItemsCount;
    cartCountElem.style.display = cartItemsCount > 0 ? "flex" : "none";
  };

  const updateTotal = () => {
    const cartItems = cartContent.querySelectorAll(".cart-box");
    const total = [...cartItems].reduce((sum, item) => {
      const price = parseFloat(item.querySelector(".cart-price").innerText.replace("$", ""));
      const quantity = item.querySelector(".cart-quantity").value;
      return sum + price * quantity;
    }, 0);
    totalPriceElem.innerText = `$${total.toFixed(2)}`;
  };

  const isProductInCart = (title) => {
    return [...cartContent.querySelectorAll(".cart-product-title")].some((item) => item.innerText === title);
  };

  const addProductToCart = (event) => {
    const product = event.target.closest(".product-box");
    const title = product.querySelector(".product-title").innerText;
    const price = parseFloat(product.querySelector(".price").innerText.replace("$", ""));
    const imgSrc = product.querySelector(".product-img").src;

    if (isProductInCart(title)) {
      alert("You have already added this item to the cart");
      return;
    }

    const cartItemHTML = `
      <div class="cart-box">
        <img src="${imgSrc}" class="cart-img" />
        <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">$${price.toFixed(2)}</div>
          <input type="number" class="cart-quantity" value="1" />
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
      </div>
    `;
    cartContent.insertAdjacentHTML("beforeend", cartItemHTML);
    updateTotal();
    updateCartCount();
  };

  const handleCartInteraction = (event) => {
    const target = event.target;
    if (target.classList.contains("cart-remove")) {
      target.closest(".cart-box").remove();
      updateTotal();
      updateCartCount();
    } else if (target.classList.contains("cart-quantity")) {
      target.value = isNaN(target.value) || target.value <= 0 ? 1 : target.value;
      updateTotal();
    }
  };

  const clearCart = () => {
    cartContent.innerHTML = "";
    updateTotal();
    updateCartCount();
  };

  cartIcon.addEventListener("click", () => toggleCartVisibility(true));
  closeCart.addEventListener("click", () => toggleCartVisibility(false));
  cart.addEventListener("click", handleCartInteraction);
  document.querySelectorAll(".add-cart").forEach((button) => button.addEventListener("click", addProductToCart));
  btnBuy.addEventListener("click", () => {
    alert("Your order is placed");
    clearCart();
  });

  updateCartCount();
});

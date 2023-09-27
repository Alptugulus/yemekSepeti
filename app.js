const btns = document.querySelectorAll(".add");
const products = document.querySelectorAll(".products li");

function quantityListener(cart) {
  const allCartItems = cart.querySelectorAll("li");

  if (allCartItems.length > 0) {
    allCartItems[allCartItems.length - 1]
      .querySelector(".decrease")
      .addEventListener("click", () => {
        allCartItems[allCartItems.length - 1].querySelector(".plate .quantity")
          .textContent--;
        allCartItems[allCartItems.length - 1].querySelector(
          ".quantity__wrapper .quantity"
        ).textContent--;

        if (
          Number(
            allCartItems[allCartItems.length - 1].querySelector(
              ".quantity__wrapper .quantity"
            ).textContent
          ) <= 0
        ) {
          allCartItems[allCartItems.length - 1].remove();
        }
      });

    allCartItems[allCartItems.length - 1]
      .querySelector(".increase")
      .addEventListener("click", () => {
        allCartItems[allCartItems.length - 1].querySelector(".plate .quantity")
          .textContent++;
        allCartItems[allCartItems.length - 1].querySelector(
          ".quantity__wrapper .quantity"
        ).textContent++;
      });
  }
}

products.forEach((product, index) => {
  btns[index].addEventListener("click", () => {
    const img = product.querySelector(".plate img").src;
    const productName = product.querySelector(
      ".content .menu-item"
    ).textContent;

    const price = product.querySelector(".content .price").textContent;

    const item = `
    <li>
      <div class="plate">
        <img src="${img}" alt="Fish Sticks and Fries" class="plate" />
        <div class="quantity">1</div>
      </div>
      <div class="content">
        <p class="menu-item">${productName}</p>
        <p class="price">${price}</p>
      </div>
      <div class="quantity__wrapper">
        <button class="decrease">
          <img src="images/chevron.svg" />
        </button>
        <div class="quantity">1</div>
        <button class="increase">
          <img src="images/chevron.svg" />
        </button>
      </div>
      <div class="subtotal">
      ${price}
      </div>
    </li>`;

    const cart = document.querySelector(".cart-summary");

    const addToCart = document.querySelectorAll(".cart-summary .menu-item");

    if (addToCart.length === 0) {
      cart.insertAdjacentHTML("beforeend", item);
      quantityListener(cart);
    } else {
      const nameProducts = [];
      addToCart.forEach((item) => nameProducts.push(item.innerText));

      if (!nameProducts.includes(productName)) {
        cart.insertAdjacentHTML("beforeend", item);
        quantityListener(cart);
      }
    }
  });
});

const btns = document.querySelectorAll(".add");
const products = document.querySelectorAll(".products li");
let total = document.querySelector(".totals .amount.price");
total.innerHTML = 0;
let mainTotal = 0;

function difPrice(product, type) {
    const priceInfo = Number(product.querySelector(".price").textContent.substring(1));
    if (type == "arttır") {
        mainTotal = mainTotal + priceInfo;
    } else {
        mainTotal = mainTotal - priceInfo;
    }

    if (mainTotal < 0) {
        mainTotal = 0;
    }

    let tax = document.querySelector(".price.tax");
    tax.innerHTML = (mainTotal * 0.08).toFixed(2);
    let lastTotalElement = document.querySelector(".price.total");
    lastTotalElement.innerHTML = (mainTotal * 1.08).toFixed(2);
    let total = document.querySelector(".totals .amount.price");
    total.innerText = mainTotal.toFixed(2);
}

function calculate(lastItem, selector, quantity, product, type) {
    lastItem.querySelector(selector).textContent = (
        Number(lastItem.querySelector(".content .price").textContent.trim().substring(1)) * Number(quantity)
    ).toFixed(2);
    difPrice(product, type);
}

function quantityListener(cart, product) {
    const allCartItems = cart.querySelectorAll("li");
    const lastItem = allCartItems[allCartItems.length - 1];

    if (allCartItems.length > 0) {
        lastItem.querySelector(".decrease").addEventListener("click", () => {
            lastItem.querySelector(".plate .quantity").textContent--;
            lastItem.querySelector(".quantity__wrapper .quantity").textContent--;

            calculate(lastItem, ".subtotal", lastItem.querySelector(".plate .quantity").textContent, product, "azalt");

            if (
              Number(
                lastItem.querySelector(".quantity__wrapper .quantity")
                  .textContent
              ) <= 0
            ) {
              lastItem.remove();
            }
        });

        lastItem.querySelector(".increase").addEventListener("click", () => {
            lastItem.querySelector(".plate .quantity").textContent++;
            lastItem.querySelector(".quantity__wrapper .quantity").textContent++;
            calculate(lastItem, ".subtotal", lastItem.querySelector(".plate .quantity").textContent, product, "arttır");
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
        <img src="${img}" alt="${productName}" class="plate" />
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
      ${price.substring(1)}
      </div>
    </li>`;

        const cart = document.querySelector(".cart-summary");
        const cartItems = document.querySelectorAll(".cart-summary .menu-item");

        if (cartItems.length === 0) {
            cart.insertAdjacentHTML("beforeend", item);
            quantityListener(cart, product);
            difPrice(product, "artteır");
        } else {
            const nameProducts = [];
            cartItems.forEach((item) => nameProducts.push(item.innerText));
            if (!nameProducts.includes(productName)) {
                cart.insertAdjacentHTML("beforeend", item);
                quantityListener(cart, product);
                difPrice(product, "arwttır");
            }
        }
    });
});

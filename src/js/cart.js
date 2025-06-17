import { elCart, elCounter } from "./html-elements.js";

let products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

export function calculate() {
  return products.reduce((sum, p) => sum + p.amount, 0);
}

export function updateProductsCounter() {
  const total = calculate();
  for (const el of elCounter) {
    el.textContent = total;
  }
}

export function saveAndUpdate() {
  localStorage.setItem("products", JSON.stringify(products));
  products = JSON.parse(localStorage.getItem("products"));
  updateProductsCounter();
  updateCartInfo();
}

export function addBasket(product) {
  const existing = products.find((p) => p.id === product.id);
  if (existing) {
    existing.amount += 1;
  } else {
    products.push({ ...product, amount: 1 });
  }
  saveAndUpdate();
}

export function removeBasket(productId) {
  const index = products.findIndex((p) => p.id === productId);
  if (index !== -1) {
    if (products[index].amount > 1) {
      products[index].amount -= 1;
    } else {
      products.splice(index, 1);
    }
    saveAndUpdate();
  }
}

export function updateCartInfo() {
  if (products.length === 0) {
    elCart.innerHTML = `
      <div class="text-center mt-12">
        <p class="text-2xl font-semibold">Your Cart (0)</p>
        <div class="mt-6 flex justify-center select-none">
          <img src="/src/images/empty.png" alt="empty" class="max-w-[100px] h-auto opacity-70" />
        </div>
        <p class="mt-4 text-gray-600">Your added items will appear here</p>
      </div>
    `;
    return;
  }

  let html = `<p class="text-2xl font-semibold mb-4">Your Cart (${calculate()})</p>`;
  products.forEach((p) => {
    html += `
      <div class="max-w-sm w-full mt-4 mx-auto">
        <div class="p-4 border rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p class="text-lg font-semibold">${p.name}</p>
            <p class="text-gray-600">x ${p.amount}</p>
          </div>
          <button
            class="decrease-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            data-id="${p.id}">
            -
          </button>
        </div>
      </div>
    `;
  });

  elCart.innerHTML = html;

  const decreaseButtons = document.querySelectorAll(".decrease-btn");
  decreaseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      removeBasket(id);
    });
  });
}

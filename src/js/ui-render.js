// ui-render.js
import { elContainer, elLoader } from "./html-elements.js";
import { addBasket } from "./cart.js"; // <-- bu qatorni qo'shing

export function uiRender(products) {
  elLoader.classList.add("hidden");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  elContainer.innerHTML = ""; // har renderda tozalab olish muhim

  products.forEach((element) => {
    const { id, thumbnail, category, title, price, rating } = element;

    elContainer.innerHTML += `
      <li class="list-none">
        <div class="max-w-xs mx-auto">
          <div class="relative border  rounded-md tooltip flex flex-col items-center" data-tip="${title} ${formatter.format(
      price
    )}">
            <img class="rounded-xl w-full" src="${thumbnail}" alt="product" />

            <button
              class="add-to-cart absolute left-6 right-6 xl:-bottom-6 bottom-[-20px] cursor-pointer py-2 text-sm sm:text-base px-4 sm:px-7 text-black bg-white border border-[#AD8A85] rounded-full"
              data-id="${id}">
              <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>

        <!-- text -->
        <div class="pt-8 max-w-xs mx-auto text-center sm:text-left px-2">
          <p class="category text-sm text-gray-500">${category}</p>
          <p class="title text-xl font-medium break-words">${title}</p>
          <p class="price text-lg font-medium text-[#AD8A85]">${formatter.format(
            price
          )}</p>
          <p>
              ⭐️ <span class="rating">${rating}</span>
          </p>
        </div>
      </li>
    `;
  });

  elContainer.classList.remove("hidden");
  elContainer.classList.add("grid");

  const btns = document.querySelectorAll(".add-to-cart");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      const product = products.find((p) => p.id === id);
      addBasket({ ...product, name: product.title });
    });
  });
}

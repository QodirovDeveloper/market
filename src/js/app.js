// app.js
import { uiRender } from "./ui-render.js";
import { updateProductsCounter, updateCartInfo } from "./cart.js";

let products = []; // Global o'zgaruvchi

// Mahsulotlarni olish
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    products = res.products;
    uiRender(products);
    renderBrands();
    renderTags();
  })
  .catch((error) => console.error(error));

updateProductsCounter();
updateCartInfo();

// Narx bo‘yicha sortlash
document.getElementById("price-sort").addEventListener("click", (e) => {
  const type = e.target.getAttribute("data-price");
  if (!type) return;
  const sorted = [...products].sort((a, b) =>
    type === "low" ? a.price - b.price : b.price - a.price
  );
  uiRender(sorted);
});

// Reyting bo‘yicha sortlash
document.getElementById("rating-sort").addEventListener("click", () => {
  document.getElementById("rating-radio").checked = true;
  const sorted = [...products].sort((a, b) => b.rating - a.rating);
  uiRender(sorted);
});

// Brandlar
function renderBrands() {
  const uniqueBrands = [...new Set(products.map((p) => p.brand))];
  const brandList = document.getElementById("brand-list");
  brandList.innerHTML = "";

  uniqueBrands.forEach((brand) => {
    const li = document.createElement("li");
    li.textContent = brand;
    li.className = "block px-4 py-2 hover:bg-gray-100 cursor-pointer";
    li.setAttribute("data-brand", brand);
    brandList.appendChild(li);
  });

  brandList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    const brand = li?.getAttribute("data-brand");
    if (!brand) return;
    const filtered = products.filter((p) => p.brand === brand);
    uiRender(filtered);
  });
}

// Taglar
function renderTags() {
  const tagList = document.getElementById("tag-list");
  const uniqueTags = [...new Set(products.flatMap((p) => p.tags))];
  tagList.innerHTML = "";

  uniqueTags.forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    li.className = "block px-4 py-2 hover:bg-gray-100 cursor-pointer";
    li.setAttribute("data-tag", tag);
    tagList.appendChild(li);
  });

  tagList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    const tag = li?.getAttribute("data-tag");
    if (!tag) return;
    const filtered = products.filter((p) => p.tags.includes(tag));
    uiRender(filtered);
  });
}

// Dark Light
const html = document.documentElement;
const themeTogler = document.getElementById("theme-toggler");
const theme = localStorage.getItem("theme");

if (theme) {
  html.dataset.theme = theme;
  themeTogler.checked = theme === "dark";
}

themeTogler.addEventListener("click", () => {
  html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", html.dataset.theme);
  themeTogler.checked = html.dataset.theme === "dark";
});

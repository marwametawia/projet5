import { getCart } from "./cart.js";
import { saveCart } from "./cart.js";
import { setProductQuantity } from "./cart.js";

const queryString = window.location.search;

const query = new URLSearchParams(queryString.substring(1));
const ID = query.get("id");

const fetchProduct = () => {
    return fetch(`http://localhost:3000/api/products/${ID}`)
        .then((res) => res.json())
        .then((resApi) => {
            console.log(resApi);
            return resApi;
        })
        .catch((error) => console.error(error));
};
const productDisplay = async () => {
    const product = await fetchProduct();
    const template = document.querySelector("#item-template");
    const container = document.getElementsByClassName("item");
    const clone = document.importNode(template.content, true);

    clone.querySelector("img").setAttribute("alt", `${product.altTxt}`);
    clone.querySelector("img").setAttribute("src", `${product.imageUrl}`);
    clone.querySelector("#title").textContent = `${product.name}`;
    clone.querySelector("#price").textContent = `${product.price}`;
    clone.querySelector("#description").textContent = `${product.description}`;

    for (let i = 0; i < product.colors.length; i++) {
        clone
            .querySelector("select")
            .setAttribute("name", `${product.colors[i]}`);
        clone.querySelector("#colors").value += product.colors[i];
    }

    container.appendChild(clone);
};

const button = document.getElementById("addToCart");
button.addEventListener("click", () => {
    const qty = document.getElementById("quantity").value;
    setProductQuantity(product, qty);
});

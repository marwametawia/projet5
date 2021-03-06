import { setProductQuantity } from "./utils.js";
import { saveCart } from "./utils.js";
import { getCart } from "./utils.js";

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
const displayProduct = async () => {
    const product = await fetchProduct();
    const template = document.querySelector("#item-template");
    const container = document.querySelector(".item");
    const clone = document.importNode(template.content, true);

    clone.querySelector("img").setAttribute("alt", `${product.altTxt}`);
    clone.querySelector("img").setAttribute("src", `${product.imageUrl}`);
    clone.querySelector("#title").textContent = `${product.name}`;
    clone.querySelector("#price").textContent = `${product.price}`;
    clone.querySelector("#description").textContent = `${product.description}`;

    for (let i = 0; i < product.colors.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", product.colors[i]);
        option.textContent = product.colors[i];
        clone.querySelector("#colors").append(option);
    }

    container.appendChild(clone);
    const button = document.getElementById("addToCart");
    button.addEventListener("click", async (e) => {
        console.log("on ajoute un produit");
        let qty = parseInt(document.getElementById("quantity").value);
        let color = document.querySelector("#colors").value;
        console.log("produit ajouté");
        console.log(color);
        if (!color) {
            alert("Veuillez selectionner une couleur");
        }
        const cartsProduct = await getCart();
        let updatedQuantity = 0;
        const foundProduct = cartsProduct.find(
            (productToFind) =>
                productToFind.product._id === product._id &&
                productToFind.color === color
        );
        
        if (!foundProduct) {
            setProductQuantity(product, qty, color);
            return;
        }
        updatedQuantity = foundProduct.quantity + qty;
        console.log(updatedQuantity);
        setProductQuantity(product, updatedQuantity, color);
    });
};
displayProduct();

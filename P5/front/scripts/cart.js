import { setProductQuantity } from "./utils.js";
import { saveCart } from "./utils.js";
import { getCart } from "./utils.js";

const displayCart = async () => {
    const cart = await getCart();
    const templateItems = document.querySelector("#cart__items-template");
    console.log(templateItems);
    const containerItems = document.getElementById("cart__items");
    console.log(containerItems);
    while (containerItems.firstChild) {
        containerItems.firstChild.remove();
    }
    cart.forEach(({ product, quantity, color }) => {
        const clone = document.importNode(templateItems.content, true);
        let changeQuantity = clone.querySelector(".itemQuantity");

        clone.querySelector(".cart__item").dataset.id = `${product._id}`;
        clone.querySelector("img").setAttribute("alt", `${product.altTxt}`);
        clone.querySelector("img").setAttribute("src", `${product.imageUrl}`);
        clone.querySelector(".cart__item__content__titlePrice p").textContent =
            `${product.name}` + " " + color;
        clone.querySelector(
            ".cart__item__content__titlePrice h2"
        ).textContent = `${product.price}€`;
        changeQuantity.addEventListener("change", async (e) => {
            if (parseInt(e.target.value) > 100) {
                alert("La quantité totale du produit ne peut excéder 100!");
                return;
            }
            //await setProductQuantity(product, 0, color);
            await setProductQuantity(product, parseInt(e.target.value), color);
            await displayCartBottomLine();
        });
        clone
            .querySelector(".deleteItem")
            .addEventListener("click", async () => {
                await setProductQuantity(product, 0, color);
                await displayCartBottomLine();
                displayCart();
            });
        clone.querySelector(".itemQuantity").value = quantity;

        containerItems.appendChild(clone);
    });
    displayCartBottomLine();
};

const displayCartBottomLine = async () => {
    const cart = await getCart();
    let updateQty = 0;
    let updatePrice = 0;
    cart.forEach((cartEntry) => {
        updateQty += cartEntry.quantity;
        updatePrice += cartEntry.quantity * cartEntry.product.price;
    });
    document.querySelector("#totalQuantity").textContent = updateQty;
    document.querySelector("#totalPrice").textContent = updatePrice;
};

const getFormValues = async () => {
    const inputFirstName = document.querySelector("#firstName");
    const inputLastName = document.querySelector("#lastName");
    const inputAdress = document.querySelector("#address");
    const inputCity = document.querySelector("#city");
    const inputMail = document.querySelector("#email");
    const errorfirstName = document.querySelector("#firstNameErrorMsg");
    const errorLastName = document.querySelector("#lastNameErrorMsg");
    const errorAdress = document.querySelector("#addressErrorMsg");
    const errorCity = document.querySelector("#cityErrorMsg");
    const errorMail = document.querySelector("#emailErrorMsg");
    const regexMail =
        /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    const lettersOnly = /^[a-zA-Z]+$/i;
    if (!inputFirstName.value) {
        errorfirstName.textContent = "Veuillez renseigner votre prénom";
    }

    if (!inputLastName.value) {
        errorLastName.textContent = "Veuillez renseigner votre nom";
    }
    if (!inputAdress.value) {
        errorAdress.textContent = "Veuillez renseigner votre adresse";
    }

    if (!inputCity.value) {
        errorCity.textContent = "Veuillez renseigner votre ville";
    }

    if (!inputMail.value) {
        errorMail.textContent = "Veuillez renseigner votre adresse mail";
    }

    if (!regexMail.test(inputMail.value)) {
        document.querySelector("#emailErrorMsg").textContent =
            "L'adresse mail n'est pas valide";
        document.querySelector("#emailErrorMsg").style.color = red;
    }

    if (!lettersOnly.test(inputLastName.value)) {
        document.querySelector("#lastNameErrorMsg").textContent =
            "Votre nom ne doit pas contenir de chiffres!";
        document.querySelector("#lastNameErrorMsg").style.color = red;
    }

    if (!lettersOnly.test(inputFirstName.value)) {
        document.querySelector("#firstNameErrorMsg").textContent =
            "Votre prénom ne doit pas contenir de chiffres!";
        document.querySelector("#firstNameErrorMsg").style.color = red;
    }

    const cart = await getCart();
    const productsOnCartsId = cart.map((cartEntry) => cartEntry.product._id);
    const order = {
        contact: {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            city: inputCity.value,
            address: inputAdress.value,
            email: inputMail.value,
        },
        products: productsOnCartsId,
    };

    return order;
};

const postOrder = async () => {
    const data = await getFormValues();
    const response = await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};

displayCart();

document.querySelector("#order").addEventListener("click", async (e) => {
    const cart = await getCart();
    if (cart.length === 0) {
        alert("Votre panier est vide");
        return;
    }
    e.preventDefault(); //empeche de rafraichir la page
    const order = await postOrder();
    console.log(order);
    saveCart(null);
    window.location.href = "../html/confirmation.html?orderId=" + order.orderId;
});

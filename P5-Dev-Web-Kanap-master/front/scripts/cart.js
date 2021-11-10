export const setProductQuantity = async (productToSet, quantityToSet) => {
    const cartsProduct = await getCart();
    const foundProduct = cartsProduct.find(
        (p) =>
            p.product.id === productToSet.id &&
            p.product.color === productToSet.color
    );

    if (quantityToSet === 0) {
        cartsProduct.splice(cartsProduct.indexOf(foundProduct), 1);
    }

    if (foundProduct === undefined && quantityToSet > 0) {
        cartsProduct.push({
            quantity: quantityToSet,
            product: productToSet,
        });
        saveCart(cartsProduct);
        return;
    }

    foundProduct.quantity = quantityToSet;
    saveCart(cartsProduct);
};

export const saveCart = (cartsProduct) => {
    localStorage.setItem("cart", JSON.stringify(cartsProduct));
};

export const getCart = () => {
    if (localStorage.getItem("cart") === null) {
        return [];
    }
    return JSON.parse(localStorage.getItem("cart"));
};

const displayCart = async () => {
    const cart = await getCart();
    const templateItems = document.querySelector("#cart__items-template");
    console.log(templateItems);
    const containerItems = document.getElementById("cart__items");
    console.log(containerItems);
    const totalQuantityDoc = document.querySelector("#totalQuantity");
    const totalPriceDoc = document.querySelector("#totalPrice");
    const removeProduct = document.querySelector(".deleteItem");

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(({ product, quantity }) => {
        const clone = document.importNode(templateItems.content, true);
        clone.querySelector(".cart__item").dataset.id === `${product._id}`;
        clone.querySelector("img").setAttribute("alt", `${product.altTxt}`);
        clone.querySelector("img").setAttribute("src", `${product.imageUrl}`);
        clone.querySelector(
            ".cart__item__content__titlePrice p"
        ).textContent = `${product.name}`;
        clone.querySelector(
            ".cart__item__content__titlePrice h2"
        ).textContent = `${product.price}€`;
        clone.querySelector(".itemQuantity").value = quantity;
        removeProduct.addEventListener("click", () => {
            setProductQuantity(product, 0);
        });

        totalQuantity += quantity;
        totalPrice += quantity * product.price;
        containerItems.appendChild(clone);
        totalPriceDoc.textContent = totalPrice;
        totalQuantityDoc.textContent = totalQuantity;
    });
};

const getFormValues = async () => {
    const submitButton = document.querySelector(".cart__order__form__submit");
    const copyOfCartLS = await getCart();
    let inputName = document.querySelector("#name");
    let inputLastName = document.querySelector("#lastname");
    let inputAdress = document.querySelector("#adress");
    let inputCity = document.querySelector("#city");
    let inputMail = document.querySelector("#mail");
    submitButton.addEventListener("click", () => {
        const productsOnCart = [];
        productsOnCart.push(copyOfCartLS);
        const order = {
            customer: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                city: inputCity.value,
                address: inputAdress.value,
                email: inputMail.value,
            },
            products: productsOnCart,
        };
    });
    return order;
};

const postOrder = () => {
  const form = document.querySelector(".cart__order__form");
  

};
displayCart();

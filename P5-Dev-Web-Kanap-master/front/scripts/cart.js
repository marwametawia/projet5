const cartsProduct = [];

const carts = document.querySelectorAll("addToCart");
console.log(carts);

const addProductToCart = (productToAdd) => {
    const foundProduct = cartsProduct.find(
        (p) => p.id === productToAdd.id && p.color === productToAdd.color
    );

    if (foundProduct === undefined) {
        cartsProduct.push(productToAdd);
        return;
    }

    foundProduct.quantity++;

};

const setProductQuantity = (productToSet, quantityToSet) => {
    const foundProduct = cartsProduct.find(
        (p) => p.id === productToAdd.id && p.color === productToAdd.color
    );

    if ((foundProduct === undefined) &&(quantityToSet>0)) {
        cartsProduct.push(productToSet);
        productToSet.quantity = quantityToSet;
        return;
    }

    foundProduct.quantity= quantityToSet;

};



const cartDisplay =  (cartsProduct) => {
    const template = document.querySelector("#cart__items-template");
    console.log(template);
    const container = document.getElementById("cart_items");
    console.log(container);

    cartsProduct.forEach((product) => {
        const clone = document.importNode(template.content, true);
        clone.querySelector(".cart__item").dataset.id === `${product._id}`;
        clone.querySelector("img").setAttribute("alt", `${product.altTxt}`);
        clone.querySelector("img").setAttribute("src", `${product.imageUrl}`);
        clone.querySelector(".cart__item__content__titlePrice").firstChild.textContent = `${product.name}`;
        clone.querySelector(".cart__item__content__titlePrice").lastChild.textContent = `${product.price}`;
        clone.querySelector(".cart__item__content__settings__quantity").textContent += `${product.quantity}`;
       
        container.appendChild(clone);
    });
};


const saveCart = (cartsProduct) => {
    localStorage.setItem("cart",JSON.stringify(cartsProduct));
}






























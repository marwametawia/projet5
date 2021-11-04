export const setProductQuantity = async (productToSet, quantityToSet) => {
    const cartsProduct= await getCart();
    const foundProduct = cartsProduct.find(
        (p) => p.product.id === productToSet.id && p.product.color === productToSet.color
    );

    if ((foundProduct === undefined) &&(quantityToSet>0)) {
        cartsProduct.push({
            quantity: quantityToSet,
            product: productToSet

        });
        saveCart(cartsProduct);
        return ;
    }

    foundProduct.quantity= quantityToSet;
    saveCart(cartsProduct);

};

export const saveCart = (cartsProduct) => {
    localStorage.setItem("cart",JSON.stringify(cartsProduct));
}

export const getCart = () => {
  return JSON.parse( localStorage.getItem("cart"));
}




const cartDisplay =  async () => {
    const basket = await getCart(); 
    const templateItems = document.querySelector("#cart__items-template");
    console.log(templateItems);
    const containerItems = document.getElementById("cart_items");
    console.log(containerItems);
    const totalQuantityDoc= document.querySelector("#totalQuantity");
    const totalPriceDoc= document.querySelector("totalPrice")

    const totalQuantity = 0;
    const totalPrice = 0;

    basket.forEach((product) => {
        const clone = document.importNode(templateItems.content, true);
        clone.querySelector(".cart__item").dataset.id === `${product._id}`;
        clone.querySelector("img").setAttribute("alt", `${product.altTxt}`);
        clone.querySelector("img").setAttribute("src", `${product.imageUrl}`);
        clone.querySelector(".cart__item__content__titlePrice").firstChild.textContent = `${product.name}`;
        clone.querySelector(".cart__item__content__titlePrice").lastChild.textContent = `${product.price}`;
        clone.querySelector(".cart__item__content__settings__quantity").textContent += `${product.quantity}`;
        totalQuantity += product.quantity;
        totalPrice += (product.quantity) * (product.price)
        containerItems.appendChild(clone);
        totalPriceDoc.textContent= totalPrice;
        totalQuantityDoc.textContent= totalQuantity;
    });
    

    
};






























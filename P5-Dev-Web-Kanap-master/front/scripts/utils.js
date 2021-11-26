export const setProductQuantity = async (
    productToSet,
    quantityToSet,
    colorSelected) => {
    const cartsProduct = await getCart();
    const foundProduct = cartsProduct.find(
        (productToFind) =>
            productToFind.product._id === productToSet._id &&
            productToFind.color === colorSelected
    );

    if (quantityToSet === 0 && foundProduct!==undefined) {
        cartsProduct.splice(cartsProduct.indexOf(foundProduct), 1);
        saveCart(cartsProduct);
        return cartsProduct;
    }

    if (
        foundProduct === undefined &&
        quantityToSet > 0 &&
        quantityToSet <= 100
    ) {
        cartsProduct.push({
            quantity: quantityToSet,
            product: productToSet,
            color: colorSelected,
        });
        saveCart(cartsProduct);
        return;
    }

    foundProduct.quantity = Number(quantityToSet);
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
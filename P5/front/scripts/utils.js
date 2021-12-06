export const setProductQuantity = async (
    productToSet,
    quantityToSet,
    colorSelected) => {
        if (!colorSelected || quantityToSet<0){
            return
        }
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
    if ((foundProduct.quantity += Number(quantityToSet)) <=100){;

    foundProduct.quantity += Number(quantityToSet);
    saveCart(cartsProduct);
    return}
    alert ("La quantité totale du produit ne peut excéder 100!");
};

export const saveCart = (cartsProduct) => {
    localStorage.setItem("cart", JSON.stringify(cartsProduct));
};

export const getCart = async() => {
    const cart= JSON.parse(localStorage.getItem("cart"))
    if (!cart) {
        return [];
    }
    return JSON.parse(localStorage.getItem("cart"));
};
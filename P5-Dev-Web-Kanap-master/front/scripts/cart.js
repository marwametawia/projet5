import { setProductQuantity } from "./utils.js";
import { saveCart} from "./utils.js";
import { getCart } from "./utils.js";

const displayCart = async () => {
    const cart = await getCart();
    const templateItems = document.querySelector("#cart__items-template");
    console.log(templateItems);
    const containerItems = document.getElementById("cart__items");
    console.log(containerItems);
    let changeQuantity = document.querySelector(".itemQuantity");
    let newQuantity = document.querySelector(
        ".cart__item__content__settings__quantity p"
    );
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
        changeQuantity.addEventListener("change", () => {
            newQuantity.textContent = this.value;
            setProductQuantity(product, product.color, newQuantity.value);
        });
        document.querySelector(".deleteItem").addEventListener("click", () => {
            setProductQuantity(product, product.color, 0);
        });
        clone.querySelector(".itemQuantity").value = quantity;

        totalQuantity += quantity;
        totalPrice += quantity * product.price;
        containerItems.appendChild(clone);
        totalPriceDoc.textContent = totalPrice;
        totalQuantityDoc.textContent = totalQuantity;
    });
};

const getFormValues = async () => {
    const copyOfCartLS = await getCart();
    let inputName = document.querySelector("#firstName");
    let inputLastName = document.querySelector("#lastName");
    let inputAdress = document.querySelector("#adress");
    let inputCity = document.querySelector("#city");
    let inputMail = document.querySelector("#mail");
    let errorfirstName= document.querySelector("#firstNameErrorMsg");
    let errorLastName = document.querySelector("#lastNameErrorMsg");
    let errorAdress = document.querySelector("#addressErrorMsg");
    let errorCity= document.querySelector("#cityErrorMsg");
    let errorMail = document.querySelector("#emailErrorMsg");
    let regexMail =
        /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

    if (!inputName.value){
            errorfirstName.textContent= "Veuillez renseigner votre prénom";
        }

    if (!inputLastName.value) {
        errorLastName.textContent= "Veuillez renseigner votre nom";
    } 
    if(!inputAdress.value ){
        errorAdress.textContent= "Veuillez renseigner votre adresse"
    }
    
    if (!inputCity.value){
        errorCity.textContent= "Veuillez renseigner votre ville"
    }
    
    
     if (!inputMail.value)
    {
        errorMail.textContent= "Veuillez renseigner votre adresse mail"
    }

    if (!regexMail.test(inputMail.value)) {
        document.querySelector("#emailErrorMsg").textContent = "L'adresse mail n'est pas valide";
        document.querySelector("#emailErrorMsg").style.color = red;
    }

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

    return order;
};

const postOrder = async () => {
    const data = await getFormValues();
    const response = await fetch('http://localhost:3000/api/order', 
            {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let  order = null;
    if (response.status === 201) 
    {
        order = await response.json()
        console.log("Commande passée avec succès")
    } 
    return order;
};

const submitOrder = async () =>{
    const order = await postOrder();
    const submit = document.querySelector("#id");
    submit.addEventListener('click', () => {
        window.location.href= "../html/confirmation.html?orderId"=order.orderId;
        localStorage.saveCart('cartsProduct', null);
    })

}

displayCart();
submitOrder();

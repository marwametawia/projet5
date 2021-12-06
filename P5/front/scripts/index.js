const fetchProducts = () => {
    return fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((resApi) => {
            console.log(resApi);
            return resApi;
        })
        .catch((error) => console.error(error));
};

const productsDisplay = async () => {
    const products = await fetchProducts();

    const template = document.querySelector("#items-template");
    console.log(template);
    const container = document.getElementById("items");
    console.log(container);

    products.forEach((product) => {
        const clone = document.importNode(template.content, true);
        clone
            .querySelector("a")
            .setAttribute("href", `./product.html?id=${product._id}`);
        clone.querySelector("img").setAttribute("alt", `${product.altTxt}`);
        clone.querySelector("img").setAttribute("src", `${product.imageUrl}`);
        clone.querySelector(".productName").textContent = `${product.name}`;
        clone.querySelector(".productDescription").textContent = `${product.description}` 
       
        container.appendChild(clone);
    });
};

productsDisplay();

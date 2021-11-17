const queryString = window.location.search;

const query = new URLSearchParams(queryString.substring(1));
const orderId = query.get("orderId");

const template = document.querySelector("#confirmationTemplate");
const container = document.querySelector(".confirmation");
const clone = document.importNode(template.content, true);
clone.querySelector("#spanId").textContent = orderID;

const queryString = window.location.search;

const query = new URLSearchParams(queryString.substring(1));
const orderId = query.get("orderId");
console.log(orderId);
document.querySelector("#orderId").textContent = orderId;

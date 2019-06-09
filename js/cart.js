const cart_content = document.querySelector("#content-cart");
const cart_button = document.querySelector("#button-cart");

cart_button.addEventListener("click", async (event) => {
  
  const arrayProducts = await fetchProducts();
  cart_content.innerHTML = `
    <div class= "cart">
        ${createProductDiv(arrayProducts)}
        <div class="total">
            <span class="valor__total">Total do pedido: R$ ${totalPrice(arrayProducts)} </span>
        </div>
        <button id="btn">Comprar</button>
    </div>
  `
  toggleMiniCart(cart_content);
});

function toggleMiniCart(element) {
  if (getComputedStyle(element).display == "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

async function fetchProducts() {
  const request = await fetch("/cart-data");
  const json = await request.json();
  return json.cart.item;
}


function createProductDiv(products) {
  let listaProdutos = [];
  products.map(item => {
    listaProdutos.push(
        `<div class="product">
            <div class="product__image"><img src="${item.image}" alt="${item.name}" /></div>
            <div class="product__description"> ${item.name}
                <span>QTY: ${item.quantity}</span> <span>Preço: R$ ${item.bestPriceFormated}</span>
            </div>
        </div>`
    )
  });
  return listaProdutos.join(" ");
}

function totalPrice(products) {
  let total = 0;
  products.map(item => {
    total += item.bestPrice;
  });
  return total.toLocaleString('pt-br');
}
const cart_content = document.querySelector("#content-cart");
const cart_button = document.querySelector("#button-cart");

cart_button.addEventListener("click", async (event) => {
  
  const arrayProducts = await fetchProducts();
  cart_content.innerHTML = `
    <div class= "cart">
        <div class="products">
          ${createProductDiv(arrayProducts)}
        </div>
        <div class="total">
            Total do pedido: 
            <span class="valor__total">R$ ${totalPrice(arrayProducts)} </span>
        </div>
        <button id="btn">FINALIZAR COMPRA</button>
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
            <div class="product__description"> 
                <div class="text">${item.name}</div>
                <br />
                <span class="qty">Qtd: ${item.quantity}</span> 
                <span class="price">${item.bestPriceFormated}</span>
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
  return (total/100).toLocaleString('pt-br');
}
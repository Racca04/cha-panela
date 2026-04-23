const eventDate = new Date("2027-07-15T18:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = eventDate - now;

  document.getElementById("days").innerText =
    Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("hours").innerText =
    Math.floor((diff / (1000 * 60 * 60)) % 24);

  document.getElementById("minutes").innerText =
    Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById("seconds").innerText =
    Math.floor((diff / 1000) % 60);
}, 1000);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(nome, preco, imagem) {
  cart.push({ nome, preco, imagem });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="cart-item">
        <img src="${item.imagem}" class="cart-img">
        
        <div class="cart-info">
          <p>${item.nome}</p>
          <span>R$ ${item.preco}</span>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">
          ✖
        </button>
      </div>
    `;

    cartItems.appendChild(li);
    total += item.preco;
  });

  cartCount.innerText = cart.length;
  cartTotal.innerText = "Total: R$ " + total.toFixed(2);
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("open");
}

updateCart();
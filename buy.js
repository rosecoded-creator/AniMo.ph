document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.item');
  const container = document.querySelector('.item-container');
  const subtotalSpan = document.getElementById('subtotal');
  const deliverySpan = document.getElementById('delivery');
  const orderTotalSpan = document.getElementById('ordertotal');
  const checkoutButton = document.getElementById('checkout-pop');
  const DELIVERY_CHARGE = 50;

  let cartItems = new Map();
  let cart = [];

  function updateTotals() {
    let subtotal = 0;
    cartItems.forEach(({ price, qty }) => {
      subtotal += price * qty;
    });
    subtotalSpan.textContent = subtotal.toFixed(2);
    deliverySpan.textContent = DELIVERY_CHARGE.toFixed(2);
    orderTotalSpan.textContent = (subtotal + DELIVERY_CHARGE).toFixed(2);
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const imgSrc = button.getAttribute('data-img');
      const name = button.getAttribute('data-name');
      const priceStr = button.getAttribute('data-price');
      const location = button.getAttribute('data-location');
      const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
      const itemId = name.toLowerCase().replace(/\s+/g, '-');

      if (cartItems.has(itemId)) {
        const item = cartItems.get(itemId);
        item.qty++;
        const qtyInput = container.querySelector(`.cart-item[data-id="${itemId}"] input[type="number"]`);
        qtyInput.value = item.qty;
      } else {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.setAttribute('data-id', itemId);

        cartItem.innerHTML = `
          <div>
            <img src="${imgSrc}" alt="${name}">
          </div>
          <div>
            <p>
              ${name} <br>
              ${priceStr} <br>
              <i class='bx bx-map'></i> ${location} <br>
            </p>
          </div>
          <div class="remove">
            <input type="number" min="1" value="1" style="width: 50px;">
            <a href="#" class="remove-link"><i class='bx bxs-trash'></i> Remove</a>
          </div>
        `;

        container.appendChild(cartItem);
        const hr = document.createElement('hr');
        container.appendChild(hr);

        cartItems.set(itemId, { price: priceNum, qty: 1, element: cartItem, hr });

        cartItem.querySelector('.remove-link').addEventListener('click', e => {
          e.preventDefault();
          cartItem.remove();
          hr.remove();
          cartItems.delete(itemId);
          updateTotals();
        });

        const qtyInput = cartItem.querySelector('input[type="number"]');
        qtyInput.addEventListener('change', e => {
          let val = parseInt(e.target.value);
          if (isNaN(val) || val < 1) {
            val = 1;
            e.target.value = 1;
          }
          cartItems.get(itemId).qty = val;
          updateTotals();
        });
      }

      const existingCartItem = cart.find(item => item.id === itemId);
      if (existingCartItem) {
        existingCartItem.qty++;
      } else {
        cart.push({ id: itemId, name, price: priceNum, qty: 1, imgSrc, location });
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      updateTotals();
    });
  });

  deliverySpan.textContent = DELIVERY_CHARGE.toFixed(2);

  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      const cartData = [];
      cartItems.forEach((item, id) => {
        const { price, qty, element } = item;
        const name = element.querySelector('p').childNodes[0].textContent.trim();
        const priceStr = element.querySelector('p').childNodes[2].textContent.trim();
        const location = element.querySelector('p').childNodes[4].textContent.trim();
        const img = element.querySelector('img').src;

        cartData.push({
          id,
          name,
          price,
          qty,
          priceStr,
          location,
          img
        });
      });

      localStorage.setItem('cart', JSON.stringify(cartData));
      window.location.href = './checkout.html';
    });
  }
});

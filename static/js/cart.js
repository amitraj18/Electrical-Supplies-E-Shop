// static/js/cart.js
function getCSRF() {
  const t = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith('csrftoken='));
  return t ? t.split('=')[1] : '';
}

async function updateQuantity(productId, newQty, rowEl) {
  const url = '/cart/update/';
  const csrftoken = getCSRF();
  const body = JSON.stringify({product_id: productId, quantity: newQty});
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body
  });
  if (!resp.ok) {
    console.error('Update failed');
    return;
  }
  const data = await resp.json();
  // Update UI
  if (data.subtotal !== undefined) {
    rowEl.querySelector('.item-subtotal').innerText = '₹' + parseFloat(data.subtotal).toFixed(2);
  } else {
    // item removed (subtotal 0) => remove row
    rowEl.remove();
  }
  // update total
  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.innerText = '₹' + parseFloat(data.total).toFixed(2);
}

// attach listeners on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  const qtyInputs = document.querySelectorAll('.qty-input');
  qtyInputs.forEach(inp => {
    inp.addEventListener('change', function() {
      const newQty = parseInt(this.value) || 0;
      const productId = this.dataset.product;
      const row = this.closest('tr');
      updateQuantity(productId, newQty, row);
    });
  });

  // plus/minus buttons
  const plusBtns = document.querySelectorAll('.qty-plus');
  plusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.closest('.qty-controls').querySelector('.qty-input');
      input.value = parseInt(input.value || '0') + 1;
      input.dispatchEvent(new Event('change'));
    });
  });
  const minusBtns = document.querySelectorAll('.qty-minus');
  minusBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.closest('.qty-controls').querySelector('.qty-input');
      input.value = Math.max(0, parseInt(input.value || '0') - 1);
      input.dispatchEvent(new Event('change'));
    });
  });
});

let cart = [];
let json = [];

const navigate = (id) => {
  id = id === '' ? 'home' : id;
  var elems = document.querySelectorAll('.content-item');

  [].forEach.call(elems, function (el) {
    el.classList.remove('show');
    el.classList.add('hide');
  });

  document.getElementById(id).classList.add('show');
  document.getElementById(id).classList.remove('hide');
  history.pushState({}, '', '/' + id === 'home' ? '' : id);
};

window.addEventListener('load', function () {
  let url = document.location.href;
  let route = url.split('/')[url.split('/').length - 1];

  if (route.length > 0) {
    navigate(route);
  }

  fetch('/api/get/products')
    .then((data) => data.json())
    .then((data) => {
      json = data;
      console.log(json);
      loadProducts();

      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
        if (cart.length > 0) {
          cart.forEach((x) => {
            addCart(x, true);
          });
        }
      }

      loadCart();
    });
});

const loadProducts = () => {
  let html = '';
  for (let i = 0; i <= json.length - 1; i++) {
    html += `<tr class="product-row">
      <td><img src="${json[i].img}" class="thumb" /></td>      
      <td>
        <h4 class="grey-header">${json[i].name} - '${json[i].album}'</h4>
        ${json[i].desc}
      </td>
      <td><input id="product-${json[i].id}" value="1" class="form-control form-control-sm" /></td>
      <td>$${json[i].price.toFixed(2)}</td>
      <td nowrap><button type="button" class="button" onClick="addCart(${json[i].id})"><i class="fa-solid fa-cart-circle-plus"></i></button></td>
    </tr>`;
  }
  document.querySelectorAll('#product-body')[0].innerHTML = html;
};

const addCart = (id, init) => {
  if (!init) {
    let i = cart.findIndex((x) => x.id === parseInt(id));
    let qty = document.getElementById('product-' + id).value;
    if (qty === '' || isNaN(qty)) {
      return alert(`You must enter a quantity for ${json[id].name} - '${json[id].album}`);
    }
    qty = parseInt(qty);

    if (i === -1) {
      cart.push({ id, qty });
      alert(`${json[id].name} - '${json[id].album} added to cart.`);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      cart[i].qty = parseInt(cart[i].qty) + qty;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    loadCart();
  }
};

const updateQty = (id) => {
  let item = document.getElementById('cart-' + id).value;
  let cartItem = cart.findIndex((x) => x.id === parseInt(id));
  cart[cartItem].qty = parseInt(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  if (cart[cartItem].qty === 0) {
    removeCart(id);
  }
  updateTotals();
};

const loadCart = () => {
  let html = `<tr class="product-row" id="no-items">
                  <td colspan="5" class="text-center">No Items In Cart.</td>
              </tr>`;
  let item = null;
  cart.forEach((x, i) => {
    item = json.filter((i) => i.id === x.id)[0];
    if (i > -1) {
      html += `<tr class="product-row">
      <td><img src="${item.img}" class="thumb" /></td>      
      <td>
        <h4 class="grey-header">${item.name} - '${item.album}'</h4>
        ${item.desc}
      </td>
      <td><input id="cart-${item.id}" value="${x.qty}" class="form-control form-control-sm" onblur="updateQty(${item.id})" /></td>
      <td class="cart-price" id="price-${item.id}">$${item.price.toFixed(2)}</td>
      <td nowrap><button type="button" class="red-button" onClick="removeCart(${item.id})"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`;
    }
  });
  document.querySelectorAll('#cart-body')[0].innerHTML = html;
  if (cart.length > 0) {
    document.querySelectorAll('#no-items')[0].classList.add('hide');
  } else {
    document.querySelectorAll('#no-items')[0].classList.remove('hide');
  }

  updateTotals();
};

const removeCart = (id) => {
  cart.splice(
    cart.findIndex((x) => x.id === id),
    1
  );
  loadCart();
  localStorage.setItem('cart', JSON.stringify(cart));
};

const updateTotals = () => {
  let price = 0;
  let totalQty = 0;
  document.querySelectorAll('.cart-price').forEach((x) => {
    let thisId = parseInt(x.id.replace('price-', ''));
    let qty = parseInt(document.getElementById('cart-' + thisId).value);
    price += parseFloat(x.innerHTML.replace('$', '')) * qty;
    console.log(x.innerHTML);
    totalQty = totalQty + qty;
  });

  document.querySelectorAll('#cart-total')[0].innerHTML = '$' + price.toFixed(2);
  document.querySelectorAll('#cart-item-count')[0].innerHTML = totalQty;
  document.querySelectorAll('#cart-count')[0].setAttribute('data-count', totalQty);
};

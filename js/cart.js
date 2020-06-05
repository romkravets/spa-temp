class Cart {
  constructor() {
    this.cartContainer = document.querySelector('#modal-products');
    this.cart = {};
    this.addEventListeners();
    this.productService = new ProductsService();
  }
  addEventListeners() {
    this.cartContainer
      .querySelector('.order')
      .addEventListener('click', ev => this.order(ev));
  }
  async renderCart() {
    let cartDomSting = ``;
    for (const id in this.cart) {
      const product = await this.productService.getProductById(id);
      cartDomSting += `
                <div class="row" data-id="${id}">
                <div class="col-5">
                    <img class="card-img-top card-img-description" src="img/products/${product.image[0]}">
                </div>
                <div class="col-6">
                <div class="mt-3">
                  <h5 id="titleProduct">${product.title}</h5>
                  <h4 class="text-center mt-3">Ціна: <span id="priceProductSumm">${product.price}</span> грн</h4>
                </div>
                </div>
              </div>`;
      }
    this.cartContainer.querySelector(
      '.cart-product-list-container'
    ).innerHTML = cartDomSting;
  }
  addProduct(id) {
    this.cart = {};
    this.cart[id] = (this.cart[id] || 0);
  }
  cartLength() {
    return Object.keys(this.cart).length;
  }
  order(ev) {
    if (this.cartLength() === 0) {
      window.showAlert('Пожалуйста добавте товар для покупки', false);
      return;
    }
    const form = this.cartContainer.querySelector('.form-contacts');
    if (form.checkValidity()) {
      ev.preventDefault();
      fetch('order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clientName: document.querySelector('#client-name').value,
            clientEmail: document.querySelector('#client-phone').value,
            titleProduct: document.querySelector('#titleProduct').innerHTML,
            priceProduct: document.querySelector('#priceProductSumm').innerHTML,
            cart: this.cart,
          })
        })
        .then(response => {
          if (response.status === 200) {
            return response.text();
          } else {
            throw new Error('Cannot send form');
          }
        })
        .then(responseText => {
          form.reset();
          this.cart = {};
          // this.saveCart();
          // this.updateBadge();
          //this.renderCart();
          window.showAlert('Thank you! ' + responseText);
          this.cartContainer.querySelector('.btn-close').click();
        })
        .catch(error => showAlert('Ошыбка: ' + error, false));
    } else {
      window.showAlert('Пожалуйста заполните правильно форму', false);
    }
  }
}
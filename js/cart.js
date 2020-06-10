class ServiceCart {
  constructor() {
    this.cartContainer = document.querySelector('#modal-services');
    this.cart = {};
    this.addEventListeners();
    this.productService = new Services();
  }
  addEventListeners() {
    this.cartContainer
      .querySelector('.order')
      .addEventListener('click', ev => this.order(ev));
    this.cartContainer
      .querySelector('.order-two')
      .addEventListener('click', ev => this.order(ev));
  }
  async renderCart() {
    let cartDomSting = ``;
    for (const id in this.cart) {
      const service = await this.productService.getServicesById(id);
      cartDomSting += `
                <div class="row align-items-center" data-id="${id}">
                <div class="service-cart-img" style="background: url(${service.image}); min-height: 200px; background-position: center; background-repeat:no-repeat"></div>
                <div class="col-12 text-center">
                    <div class="mt-3">
                        <h3 id="title">${service.title}</h3>
                        <h4 class="text-center mt-3">Вартість: <span id="price">${service.price}</span> грн</h4>
                    </div>
                  </div>
                <div class="col-12 mt-3">
                  <p>${service.description}</p>
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
  order(ev) {
    const form = this.cartContainer.querySelector('.form-contacts');
    if (form.checkValidity()) {
      let performer = '';
      if (ev.target.innerHTML === 'Інші спеціалісти') {
          performer = 'Інші спеціалісти';
        } else if (ev.target.innerHTML === 'Юрій Мартюк') {
          performer = 'Юрій Мартюк';
      }
      ev.preventDefault();
      fetch('order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clientName:  this.cartContainer.querySelector('.client-name').value,
            clientPhone:  this.cartContainer.querySelector('.client-phone').value,
            service:  this.cartContainer.querySelector('#title').innerHTML,
            price:  this.cartContainer.querySelector('#price').innerHTML,
            performer: performer,
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
          window.showAlert('Дякую! ' + responseText);
          this.cartContainer.querySelector('.btn-close').click();
        })
        .catch(error => showAlert('Помилка: ' + error, false));
    } else {
      window.showAlert('Будь ласка зоповніть коректно форму', false);
    }
  }
}

class TeachingCart {
  constructor() {
    this.cartContainer = document.querySelector('#modal-teaching');
    this.cart = {};
    this.addEventListeners();
    this.productService = new TeachService();
  }
  addEventListeners() {
    this.cartContainer
      .querySelector('.order')
      .addEventListener('click', ev => this.order(ev));
  }
  async renderCart() {
    let cartDomSting = ``;
    for (const id in this.cart) {
      const plan = await this.productService.getTeachsById(id);
      cartDomSting += `
                <div class="row align-items-center ${plan.category}" data-id="${id}">
                  <div class="col-12 p-0">
                    <img class="img-fluid" src="${plan.image}" alt="${plan.title}">
                  </div>
                <div class="col-12 text-center p-0">
                    <div class="mt-3">
                        <h3 id="titlePlan">${plan.title}</h3>
                        <h4 class="text-center mt-3">Вартість:</h4>
                        <h4><span id="price">${plan.price}</span> грн</h4>
                    </div>
                  </div>
                <div class="col-12 mt-3">
                  <p>${plan.description}</p>
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
  order(ev) {
    const form = this.cartContainer.querySelector('.form-contacts');
    if (form.checkValidity()) {
      ev.preventDefault();
      fetch('order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clientName:  this.cartContainer.querySelector('.client-name').value,
            clientPhone:  this.cartContainer.querySelector('.client-phone').value,
            plan:  this.cartContainer.querySelector('#titlePlan').innerHTML,
            price:  this.cartContainer.querySelector('#price').innerHTML,
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
          window.showAlert('Дякую! ' + responseText);
          this.cartContainer.querySelector('.btn-close').click();
        })
        .catch(error => showAlert('Помилка: ' + error, false));
    } else {
      window.showAlert('Буль ласка зоповніть коректно форму', false);
    }
  }
}

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
                <div class="row align-items-center" data-id="${id}">
                <div class="col-5">
                    <img class="img-fluid" src="img/products/${product.image[0]}">
                </div>
                <div class="col-6">
                <div class="mt-3">
                  <h5 id="titleProduct">${product.title}</h5>
                  <h4 class="mt-3">Ціна: <span id="priceProductSumm">${product.price}</span> грн</h4>
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
    const form = this.cartContainer.querySelector('.form-contacts-product');
    if (form.checkValidity()) {
      ev.preventDefault();
      fetch('order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clientName:  this.cartContainer.querySelector('.client-name').value,
            clientPhone:  this.cartContainer.querySelector('.client-phone').value,
            titleProduct:  this.cartContainer.querySelector('#titleProduct').innerHTML,
            priceProduct:  this.cartContainer.querySelector('#priceProductSumm').innerHTML,
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
          window.showAlert('Дякую! ' + responseText);
          this.cartContainer.querySelector('.btn-close').click();
        })
        .catch(error => showAlert('Помилка: ' + error, false));
    } else {
      window.showAlert('Буль ласка зоповніть коректно форму', false);
    }
  }
}
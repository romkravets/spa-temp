class Cart {
  constructor() {
    this.cartContainer = document.querySelector('#modal-cart');
    // this.cart = JSON.parse('{}');
    this.cart = {};
    this.addEventListeners();
    //this.updateBadge();
    this.productService = new ProductsService();
  }
  addEventListeners() {
    // document
    //   .querySelector('.openCartLink')
    //   .addEventListener('click', () => this.renderCart());
    this.cartContainer
      .querySelector('.order')
      .addEventListener('click', ev => this.order(ev));
  }
  // saveCart() {
  //   localStorage['cart'] = JSON.stringify(this.cart);
  // }
  async renderCart() {
    let total = 0;
    let cartDomSting = ``;
    let selleToggle = 200;
    const saleAcssessTggle = document.querySelector('.sale-acssess-toggle');
    saleAcssessTggle.innerHTML = "<span>(сейчас обсудим каком)</span>";

    for (const id in this.cart) {
      const product = await this.productService.getProductById(id);
      const selectSize = document.querySelector('#selectSize');
      // const selectMehSize = document.querySelector('.selectMehSize');
      // const selectMech = document.querySelector('.selectMech');
      const selectAksess = document.querySelector('.selectAksess');
      const selects = document.querySelectorAll('.selects');

      const formColorAksess = document.querySelector('.form-color-aksess');
      const formColorAksessAll = document.querySelector('.form-color-aksess .all');
      const formColorAksessN = document.querySelector('.form-color-aksess .naushniki');
      const formColorAksessS = document.querySelector('.form-color-aksess .shapka');
      const childSize = document.querySelectorAll('.childSize');
      const sizeAll = document.querySelectorAll('.size');

      const formGeneral = document.querySelectorAll('.form-general');
      const formGeneralSelect = document.querySelectorAll('.form-general select');

      if (product.category === "child") {
        childSize.forEach(element => {
          element.style.display = 'block';
        });
        sizeAll.forEach(element => {
          element.style.display = 'none';
        });
        } else {
        childSize.forEach(element => {
          element.style.display = 'none';
        });
        sizeAll.forEach(element => {
          element.style.display = 'block';
        });
      }

      // total += product.price * this.cart[id];
      if (product.category === "accessories") {
        if (product.title === "Меховые наушники") {
          formColorAksessAll.style.display = 'none';
          formColorAksessN.style.display = 'block';
          formColorAksessS.style.display = 'none';
        } else if (product.title === "Варежки" || product.title === "Сумочка") {
          formColorAksessAll.style.display = 'block';
          formColorAksessN.style.display = 'none';
          formColorAksessS.style.display = 'none';
        } else if (product.title === "Шапка на меху") {
          formColorAksess.style.display = 'none';
          formColorAksessAll.style.display = 'none';
          formColorAksessN.style.display = 'none';
          formColorAksessS.style.display = 'block';
        } else {
          formColorAksess.style.display = 'none';
          formColorAksessN.style.display = 'none';
          formColorAksessAll.style.display = 'none';
          formColorAksessS.style.display = 'none';
        }
        formColorAksess.style.display = 'block';
        formGeneral.forEach(element => {
          element.style.display = 'none';
          formGeneralSelect.forEach(select => {
            select.removeAttribute('required');
          });
        })
      }
      else {
        formColorAksess.style.display = 'none';
        formColorAksessN.style.display = 'none';
        formColorAksessAll.style.display = 'none';
        formGeneral.forEach(element => {
          element.style.display = 'block';
          formGeneralSelect.forEach(select => {
            select.setAttribute('required','required');
          });
        })
      }

      let seleAll = null;
      let seleIcust = null;
      let threeMeah = 4000;

      //Sale price
      if (product.category === "child") {
        seleAll = 15100;
        seleIcust = 10100;
      } else {
        seleAll = 18400;
        seleIcust = 14400;
      }
       //Sale price

      if (product.sale === true) {
        total += product.priceSale;
      } else {
        total += product.price;
      }

      selectSize.addEventListener('change', () => {
        let opval = selectSize.options[selectSize.selectedIndex].value;
        if(opval === "Индивидуальный пошив"){
          $('#info-modal').modal("show");
          $('.tableIndivid').click();
        }
      });

      for (var i = 0; i < selects.length; i++) {
        selects[i].addEventListener('change', () => {
          for (var i = 0; i < selects.length; i++) {
            let valOne = selects[2].options[selects[2].selectedIndex].value;
            let valTwo = selects[3].options[selects[3].selectedIndex].value;
            let valthree = selects[4].options[selects[4].selectedIndex].value;
            let valFour = selects[5].options[selects[5].selectedIndex].value;
            let aksessValueAll =  parseInt(selects[2].options[selects[2].selectedIndex].value) + parseInt(selects[3].options[selects[3].selectedIndex].value) + parseInt(selects[4].options[selects[4].selectedIndex].value) +  parseInt(selects[5].options[selects[5].selectedIndex].value);

            if (product.sale === true) {
            if (selects[i].options[selects[i].selectedIndex].value === "Тройной мех") {
              total = product.price + aksessValueAll + threeMeah;
              if (valOne != 0 && valTwo != 0 || valTwo != 0 &&  valthree != 0 || valOne != 0 && valthree != 0 || valOne != 0 && valFour != 0 || valTwo != 0 && valFour != 0 ||  valthree != 0 && valFour != 0) {
                total = product.price + aksessValueAll + threeMeah - selleToggle;
                this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
              }
              this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
            }
            if (selects[0].options[selects[0].selectedIndex].value === "Двойной мех") {
              total = seleAll + aksessValueAll;
              if (valOne != 0 && valTwo != 0 || valTwo != 0 &&  valthree != 0 || valOne != 0 && valthree != 0 || valOne != 0 && valFour != 0 || valTwo != 0 && valFour != 0 ||  valthree != 0 && valFour != 0) {
                total = seleAll + aksessValueAll - selleToggle;
                this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
              }
              this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
            }
            if (selects[i].options[selects[i].selectedIndex].value === "Тройной мех" && (selects[1].options[selects[1].selectedIndex].value === "Искусственная чернобурка" || selects[1].options[selects[1].selectedIndex].value === "Искусственный енот")) {
              total = product.price + aksessValueAll;
              if (valOne != 0 && valTwo != 0 || valTwo != 0 &&  valthree != 0 || valOne != 0 && valthree != 0 || valOne != 0 && valFour != 0 || valTwo != 0 && valFour != 0 ||  valthree != 0 && valFour != 0) {
                total = product.price + aksessValueAll - selleToggle;
                this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
              }
              this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
            }
            if (selects[0].options[selects[0].selectedIndex].value === "Двойной мех" && (selects[1].options[selects[1].selectedIndex].value === "Искусственная чернобурка" || selects[1].options[selects[1].selectedIndex].value === "Искусственный енот")) {
              total = seleIcust + aksessValueAll;
              if (valOne != 0 && valTwo != 0 || valTwo != 0 &&  valthree != 0 || valOne != 0 && valthree != 0 || valOne != 0 && valFour != 0 || valTwo != 0 && valFour != 0 ||  valthree != 0 && valFour != 0) {
                total = seleIcust + aksessValueAll - selleToggle;
                this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
              }
              this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
            }
            if (valOne != 0 && valTwo != 0 || valTwo != 0 &&  valthree != 0 || valOne != 0 && valthree != 0 || valOne != 0 && valFour != 0 || valTwo != 0 && valFour != 0 ||  valthree != 0 && valFour != 0) {
              saleAcssessTggle.innerHTML = `<h4>${selleToggle} ₽</h4>`;
              }
            if (valOne != 0 && valTwo === "0" && valthree === "0" && valFour === "0" || valOne  === "0" && valTwo === "0" && valthree != 0  && valFour === "0" ||  valOne  === "0" && valTwo != 0 && valthree === "0"  && valFour === "0" ||  valOne  === "0" && valTwo === "0" && valthree === "0"  && valFour != 0 ) {
              saleAcssessTggle.innerHTML = "<span>(сейчас обсудим каком)</span>";
            }
          } else if (product.sale === false) {
            if (selects[i].options[selects[i].selectedIndex].value === "Тройной мех") {
              total = product.price + aksessValueAll + threeMeah;
              if (valOne != 0 && valTwo != 0 || valTwo != 0 &&  valthree != 0 || valOne != 0 && valthree != 0 || valOne != 0 && valFour != 0 || valTwo != 0 && valFour != 0 ||  valthree != 0 && valFour != 0) {
                total = product.price + aksessValueAll + threeMeah - selleToggle;
                this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
              }
              this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
            }
            if (selects[0].options[selects[0].selectedIndex].value === "Двойной мех") {
              total = product.price + aksessValueAll;
              if (valOne != 0 && valTwo != 0 || valTwo != 0 &&  valthree != 0 || valOne != 0 && valthree != 0 || valOne != 0 && valFour != 0 || valTwo != 0 && valFour != 0 ||  valthree != 0 && valFour != 0) {
                total = product.price + aksessValueAll - selleToggle;
                this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
              }
              this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
            }
            if (selects[i].options[selects[i].selectedIndex].value === "Тройной мех" && (selects[1].options[selects[1].selectedIndex].value === "Искусственная чернобурка" || selects[1].options[selects[1].selectedIndex].value === "Искусственный енот")) {
              total = product.price + aksessValueAll;
              this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
            }
            if (selects[0].options[selects[0].selectedIndex].value === "Двойной мех" && (selects[1].options[selects[1].selectedIndex].value === "Искусственная чернобурка" || selects[1].options[selects[1].selectedIndex].value === "Искусственный енот")) {
              total = product.price + aksessValueAll;
              if (valOne != 0 && valTwo != 0 || valTwo != 0 &&  valthree != 0 || valOne != 0 && valthree != 0 || valOne != 0 && valFour != 0 || valTwo != 0 && valFour != 0 ||  valthree != 0 && valFour != 0) {
                total = product.price + aksessValueAll - selleToggle;
                this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
              }
              this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
            }
            if (valOne != 0 && valTwo != 0 || valTwo != 0 &&  valthree != 0 || valOne != 0 && valthree != 0 || valOne != 0 && valFour != 0 || valTwo != 0 && valFour != 0 ||  valthree != 0 && valFour != 0) {
              saleAcssessTggle.innerHTML = `<h4>${selleToggle} ₽</h4>`;
              }
              if (valOne != 0 && valTwo === "0" && valthree === "0" && valFour === "0" || valOne  === "0" && valTwo === "0" && valthree != 0  && valFour === "0" ||  valOne  === "0" && valTwo != 0 && valthree === "0"  && valFour === "0" ||  valOne  === "0" && valTwo === "0" && valthree === "0"  && valFour != 0 ) {
                saleAcssessTggle.innerHTML = "<span>(сейчас обсудим каком)</span>";
            }
          }
        }
        });
      }

      selectAksess.addEventListener('change', () => {
        let optionValueAksess = selectAksess.options[selectAksess.selectedIndex].value;
        let opvaltotal = null;
        if (product.sale === true) {
          if (seleIcust === true) {
            opvaltotal = seleIcust + parseInt(optionValueAksess);
            this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
          } else if (seleIcust === null) {
          opvaltotal = seleAll + parseInt(optionValueAksess);
          total = opvaltotal.toString();
          this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
          }
        } else {
          opvaltotal = product.price + parseInt(optionValueAksess);
          total = opvaltotal.toString();
          this.cartContainer.querySelector('#priceProductSumm').innerHTML = total;
        }
      });

      cartDomSting += `
                <div class="" data-id="${id}">
                    <img class="card-img-top card-img-description" src="img/products/${product.image[0]}">
                <div class="text-center mt-3">
                  <h2 id="titleProduct">${product.title}</h2>
                  <h3>Сумма: <span id="priceProductSumm">${total}</span> ₽</h3>
                </div>
              </div>`;
      }
      total = total.toFixed(2);
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
      let sel1 = document.querySelector("#selectAksess1");
      let sel2 = document.querySelector("#selectAksess2");
      let sel3 = document.querySelector("#selectAksess3");
      let sel4 = document.querySelector("#selectAksess5");
      let selectMehNaush = document.querySelector("#selectMehNaush");
      let selectShapka = document.querySelector("#shapka");

      let selectAksess1 = sel1.options[sel1.selectedIndex].text;
      let selectAksess2 = sel2.options[sel2.selectedIndex].text;
      let selectAksess3 = sel3.options[sel3.selectedIndex].text;
      let selectAksess4 = sel4.options[sel4.selectedIndex].text;
      let mehNaush = selectMehNaush.options[selectMehNaush.selectedIndex].text;
      let shapka = selectShapka.options[selectShapka.selectedIndex].text;

      let colorAksses = document.querySelector("#colorAksses");
      let colorVarezkiiAndSumka = colorAksses.options[colorAksses.selectedIndex].text;
      ev.preventDefault();
      fetch('order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clientName: document.querySelector('#client-name').value,
            clientEmail: document.querySelector('#client-email').value,
            titleProduct: document.querySelector('#titleProduct').innerHTML,
            priceProduct: document.querySelector('#priceProductSumm').innerHTML,
            colorVarezkiiAndSumka,
            mehNaush,
            shapka,
            clientSize: document.querySelector('#selectSize').value,
            selectHeight: document.querySelector('#selectHeight').value,
            selectMehSize: document.querySelector('#selectMehSize').value,
            clientMeh: document.querySelector('#selectMeh').value,
            selectAksess1,
            selectAksess2,
            selectAksess3,
            selectAksess4,
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
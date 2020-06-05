class ProductsService {
    constructor() {
        if (!ProductsService._instance) ProductsService._instance = this;
        return ProductsService._instance;
    }
    async getProducts() {
        if (!this.products) {
            this.products = await (await fetch('products.json')).json();
        }
        return this.products;
    }
    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }
}

class TeachService {
    constructor() {
        if (!TeachService._instance) TeachService._instance = this;
        return TeachService._instance;
    }
    async getTeachs() {
        if (!this.teachs) {
            this.teachs = await (await fetch('teachs.json')).json();
        }
        return this.teachs;
    }
    async getTeachsById(id) {
        const teachs = await this.getTeachs();
        return teachs.find(teach => teach.id === id);
    }
}
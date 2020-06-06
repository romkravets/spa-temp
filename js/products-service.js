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

class Services {
    constructor() {
        if (!Services._instance) Services._instance = this;
        return Services._instance;
    }
    async getService() {
        if (!this.services) {
            this.services = await (await fetch('secvices.json')).json();
        }
        return this.services;
    }
    async getServicesById(id) {
        const services = await this.getService();
        return services.find(service => service.id === id);
    }
}
const { stringify } = require('querystring');

const fs = require('fs').promises;


class container {
    constructor(fileName){
        this.name = './' + fileName + '.txt';
    }

    async save(obj) {
        try {
            const defaultState = "[]";
            let content = await fs.readFile(this.name, "utf-8");

            if (content == "") {
                await fs.writeFile(this.name, defaultState);
                content = "[]";
            }
            const data = await JSON.parse(content);
            if (data.length > 0) {
                data.push({ ...obj, id: data[data.length - 1].id + 1 });
            } else {
                data.push({ ...obj, id: 1 });
            }
            await fs.writeFile(this.name, JSON.stringify(data, null, 2));
            return data[data.length - 1].id;
        } catch (err) {
            console.log(`There has been an error: ${error}`);
        }
    }

    async getByID(num){
        try {
            let content = await fs.readFile(this.name, "utf-8");
            const data = await JSON.parse(content);
            const product = await data.find(element => element.id === num);
            console.log(product)
            return product;
        } catch (error) {
            console.log(`There has been an error: ${error}`);
        }
    }

    async getAll(){
        try {
            let content = await fs.readFile(this.name, "utf-8");
            const data = await JSON.parse(content);
            console.log(data)
            return data;
        } catch (error) {
            console.log(`There has been an error: ${error}`);

        }
    }

    async removeById(id){
        try {
            let content = await fs.readFile(this.name, "utf-8");
            const data = await JSON.parse(content);
            const filterContent = await data.filter(element => element.id !== id);
            
            await fs.writeFile(this.name, JSON.stringify(filterContent));
        } catch (error) {
            console.log(`There has been an error: ${error}`);
        }
    }

    async deleteAll(){
        try {
            let content = await fs.readFile(this.name, "utf-8");
            const data = await JSON.parse(content);
            data.splice(0, data.length);

            await fs.writeFile(this.name, data);
        } catch (error) {
            console.log(`There has been an error: ${error}`);
        }
    }
}

const Item = {
    title: "Vodka",
    price: 1000,
    thumbnail: 'url'
}

const Item2 = {
    title: "Whisky",
    price: 2000,
    thumbnail: 'url'
}

const Item3 = {
    title: "Ron",
    price: 3000,
    thumbnail: 'url'
}

const Item4 = {
    title: "Cachaca",
    price: 4000,
    thumbnail: 'url'
}

const products = new container ("products");

products.deleteAll();
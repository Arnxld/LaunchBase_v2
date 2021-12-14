const Product = require('../models/Product');
const File = require('../models/File');
const { formatPrice } = require('../../lib/utils');
const res = require('express/lib/response');

module.exports = {
    async index(req, res) {
        let results = await Product.all()
        const products = results.rows

        if(!products) return res.send("Products not found!")
    }
}
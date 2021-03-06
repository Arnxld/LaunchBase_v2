const Category = require('../models/Category');
const Product = require('../models/Product');
const File = require('../models/File');

const { formatPrice, date } = require('../../lib/utils')

module.exports = {
    async create(req, res) {
        try {
            const categories = await Category.findAll()
            return res.render("products/create.njk", { categories })
        } catch(err) {
            console.error(err)
        }
    },

    async post(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send("Please fill all fields")
                }
            }
    
            if (req.files.length == 0)
                return res.send('Please, send at least one image')

            let { category_id, name, description, old_price, price, quantity, status } = req.body

            price = price.replace(/\D/g, "")
            
            const product_id = await Product.create({
                category_id,
                user_id: req.session.userId,
                name, 
                description, 
                old_price: old_price || price, 
                price, 
                quantity, 
                status: status || 1
            })
    
            // necessário criar o array de promessas, forEach não esperaria a criação dos arquivos
            const filesPromise = req.files.map(file => File.create({ ...file, product_id }))
            await Promise.all(filesPromise)
    
            return res.redirect(`/products/${product_id}`)
        } catch (error) {
            console.error(error)
        }
    },

    async show(req, res) {
        try {
            const product = await Product.find(req.params.id)

            if(!product) return res.send("product not found!")
    
            const {day, hour, minutes, month} = date(product.updated_at)
    
            product.published = {
                day: `${day}/${month}`,
                hour: `${hour}h${minutes}`,
            }
    
            product.oldPrice = formatPrice(product.old_price)
            product.price = formatPrice(product.price)
    
            let files = await Product.files(product.id)
           files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
    
            return res.render("products/show", {product, files})
        } catch(error) {
            console.error(error)
        }
        
    },

    async edit(req, res) {
        try {
            const product = await Product.find(req.params.id)

            if (!product) return res.send("Product not found")
    
            product.old_price = formatPrice(product.old_price)
            product.price = formatPrice(product.price)
    
            // get categories
            const categories = await Category.all()
    
            // get images
            let files = await Product.files(product.id)
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
            return res.render("products/edit", { product, categories, files })
        } catch(error) {
            console.error(error)
        }
        
    },

    async put(req, res) {
        try {

        } catch(error){
            console.error(error)
        }
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send("Please fill all fields")
            }
        }

        if(req.files.length != 0) {
            const newFilesPromise = req.files.map(file => 
                File.create({...file, product_id: req.body.id}))

            await Promise.all(newFilesPromise)
        }

        if(req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(file => File.delete(id))
            await Promise.all(removedFilesPromise)

        }

        req.body.price = req.body.price.replace(/\D/g, "")

        if (req.body.old_price != req.body.price) {
            const oldProduct = await Product.find(req.body.id)

            req.body.old_price = oldProduct.rows[0].price
        }

        await Product.update(req.body.id, {
            category_id: req.body.category_id,
            name: req.body.name,
            description: req.body.description,
            old_price: req.body.old_price,
            price: req.body.price,
            quantity: req.body.category_id,
            status: req.body.category_id,
        })

        return res.redirect(`/products/${req.body.id}/edit`)
    },

    async delete(req, res) {

        await Product.delete(req.body.id)

        return res.redirect('/products/1/edit')
    }
}
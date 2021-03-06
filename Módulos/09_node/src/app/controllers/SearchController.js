const Product = require('../models/Product');

const { formatPrice } = require('../../lib/utils');

module.exports = {
    async index(req, res) {
        try {
            let results,
                params = {}
            
            const {filter, category} = req.query

            if (!filter) return res.redirect("/")

            params.filter = filter

            if (category) {
                params.category = category
            }

            let products = await Product.search(params)

            async function getImage(productId) {
                let files = await Product.files(productId)
                files = files.map(file => (
                    `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
                ))
    
                return files[0]
            }

            const productsPromise = products.map(async product => {
                product.img = await getImage(product.id)
                product.oldPrice = formatPrice(product.old_price)
                product.price = formatPrice(product.price)
                return product
            })

            products = await Promise.all(productsPromise)

            const search = {
                term: req.query.filter,
                total: products.length
            }

            const categories = products.map(product => ({
                id: product.category_id,
                name: product.category_name
            })).reduce((FilteredCategories, cat) => { // para não repetir categories

                const found = FilteredCategories.some(category => category.id == cat.id)

                if(!found) FilteredCategories.push(category)

                return FilteredCategories
            }, [])  

            console.log(categories)

            return res.render("search/index", {products, search, categories})
        }
        catch(err) {
            console.error(err)
        }
        

    }
}
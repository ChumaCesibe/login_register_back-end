module.exports = app =>{
    const products = require('../controllers/tutorial.controller');
    const router = require('express').Router()

router.get('/', (req, res) => {
 res.json({message: 'welcome to my backend application'})
    });

//create new
router.post('/', products.create);

//retrieve all products
router.get('/addAll', products.findAll);

//retrieve one
router.get('/:id', products.findOne);

//update 
router.put('/:id', products.update);

//delete
router.delete('/:id', products.delete);

//delete all
router.delete('/', products.deleteAll)

app.use('/api/product', router);

};
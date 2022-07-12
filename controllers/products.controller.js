const req = require('express/lib/request');
const res = require('express/lib/response');
const db = require('../model');
const Product = db.products;

exports.create = (req, res) =>{
    if (!req.body.title){
        res.status(400).send({message: 'Content can not be empty!'})
        return;
    }


    //Create a product body
const product = new Product({
    title: req.body.title, //hard coded -> Tutorial Angular
    description: req.body.description, // hard coded -> introduction to angular
    price: req.body.price,
    condition: req.body.condition,
    category: req.body.category,
});

//save product

product
.save(product)
.then(data =>{
    res.send(data);
})
.catch(err =>{
    res.status(500).send({message:
    err.message || 'Some error occured while adding a product'})
});
}

//find all
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: 'i'}} : {};

    Product.find(condition)
    .then(data =>{
        res.send(data);
})
.catch(err =>{
    res.status(500).send({message:
    err.message || 'Some error occured while retrieving  product'})
});

}

//find one
exports.findOne = (req,res) =>{
    const id = req.params.id;

    Product.findById(id)
    .then(data => {
        if (!data)
        res.status(404).send({message:'Product Not found by id'+ id});
        elseres.send(data);

    })
    .catch(err => {
        res
        .status(500)
        .send({message: 'Error retrieving Product by id' + id});
    });
};

//update
exports.update = (req,res) =>{
    if (!req.body){
        return res.status(400).send({
           message:'Data to update can  not be empty!' 
        });
    }
    const id =req.params.id;
    Product.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
    .then(data => {
if (!data) {
    res.status(404).send({
        message:`Cannot update Product with id=${id}. Maybe Product was not found`
    });
    }else res.send({message: 'Product was updated succesfully'});
})
.catch(err =>{
    res.status(500).send({
       message:'Error updating Product with id=' + id  
    });
});
}

//delete
exports.delete = (req,res) =>{
    const id = req.params.id;

    Product.findByIdAndRemove(id,{useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot delete Product with id=${id}. Maybe Product was not found`
            });
        }else {res.send({message: 'Product was deleted succesfully'});

        }
    })
    .catch(err =>{
        res.status(500).send({
           message:']Could not delete Product with id=' + id  
        });
    });
}

//delete All
exports.deleteAll = (req,res) =>{
    Tutorial.deleteMany({})
    .then(data => {
        res.send({
            message:`${data.deletedCount} Products were deleted susccessfully!`
        });

    })
    .catch(err =>{
        res.status(500).send({
           message:'Some error occurred while removing all products'});


        });
    };
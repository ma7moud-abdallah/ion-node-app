const router = require('express').Router()
const async = require('async')

const Product = require('../models/product')

// getting all products
router.get('/all',(req,res,next) => {
    Product.find({},(err,products) => {
        if(err) {
            return res.status(403).json({
                success:false,
                message:'error'+err
            })
        }
        res.status(200)
        res.json({
            success:true,
            products: products  
        })
    })
})

// getting limit number of accounts per request 

router.get('/',(req,res,next) => {
    const page = req.query.page
    const perPage = 20


    async.parallel([
         (callback) => {
            Product.count({},(err,count) =>{
                if (err) return next(err)  
                callback(err,count)
            })
        },
    
      (callback) => {
            
            Product.find({})
            .skip(perPage * page)
            .limit(perPage)
            .exec((err,products) => {
              if (err) return next(err)
              callback(err,products)
            })
        }
    ], 
    (err,results) => {
        if(err) {
            return res.status(403).json({
                success:false,
                message:'error'+err
            })
        }

       let count = results[0]
       let  products = results[1] 
       res.json({
           success:true,
           products:products,
           pages:Math.ceil(count/perPage),
           totalCount:count
       }) 
    }
)    

})

// getting specific account


router.get('/:id',(req,res,next) => {
    Product.findOne({_id:req.params.id},(err,product) => {
         if(err) {
            return res.status(403).json({
                success:false,
                message:'error : '+ err
            })
        }
        if(!product){
           return res.status(400)
            .json({
                success:false,
                message:'this product may be deleted '
            })
        }
        res.status(200)
        res.json({
            success:true,
            products:product
        })
    })
})



// test code for post  fake accounts
router.post('/',(req,res,next) =>{
    let x = 35000000
    let z = 4
    let w = 202000036
    for(let i = 0 ;i < 40 ;i++){
     product = new Product({
       number: x +=x/2,
       services:z++,
       bill:w += w/4 
    })
    product.save()
 }
    
        res.status(201)
        res.json({
            success : true,
            message: 'prducts successfully added'
        })
    })




module.exports = router
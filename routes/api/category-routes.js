const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
include: [Product]

  })
  .then(data => res.json(data) )
  .catch(error=>{
res.status(500).json(error)
  })
})


router.get('/:id', (req, res) => {
  Category.findOne({
    where:{
      id:req.params.id
    },
   include:[Product]
  })
  .then(data => {
    if(!data) return res.status(400).json({message:"No Category with this id"})
    res.json(data)
  }) 
  .catch(error=>{
res.status(500).json(error)

  })
});

router.post('/', (req, res) => {
  Category.create({
    category_name:req.body.category_name
  })
  .then(data => res.json(data) )
  .catch(error=>{
res.status(500).json(error)
  })
});

router.put('/:id', (req, res) => {
  Category.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  .then(data => {
    if(!data[0]) return res.status(400).json({message:"No Category with this id"})
    res.json(data)
  }) 
  .catch(error=>{
res.status(500).json(error)

  })
});

router.delete('/:id', (req, res) => {
   Category.destroy({
     where:{
       id:req.params.id
     }
   })
   .then(data => {
    if(!data) return res.status(400).json({message:"No Category with this id"})
    res.json(data)
  }) 
  .catch(error=>{
res.status(500).json(error)

  })
});

module.exports = router;

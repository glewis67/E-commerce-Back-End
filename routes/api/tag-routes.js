const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
 Tag.findAll({
   include:[
     {
       model:Product,
       through:ProductTag
     }
   ]
 })
 .then(data => res.json(data) )
  .catch(error=>{
res.status(500).json(error)
  })
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where:{
      id:req.params.id
    },
    include:[
      {
        model:Product,
        through:ProductTag
      }
    ]
  })
  .then(data => {
    if(!data) return res.status(400).json({message:"No Tag with this id"})
    res.json(data)
  }) 
  .catch(error=>{
res.status(500).json(error)

  }) 
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name:req.body.tag_name
  })
  .then(data => res.json(data) )
  .catch(error=>{
res.status(500).json(error)
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  .then(data => {
    if(!data[0]) return res.status(400).json({message:"No Tag with this id"})
    res.json(data)
  }) 
  .catch(error=>{
res.status(500).json(error)

  }) 
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(data => {
   if(!data) return res.status(400).json({message:"No Tag with this id"})
   res.json(data)
 }) 
 .catch(error=>{
res.status(500).json(error)

 })  
});

module.exports = router;

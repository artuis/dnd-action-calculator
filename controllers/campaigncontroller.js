const express = require("express");
const router = express.Router();
const db = require("../models")

//may not be right
router.get('/',function(req,res){
    db.Campaign.findAll({include:[db.Account]}).then(data=>{
        res.status(200).json(data);
    }).catch(err => res.sendStatus(500))
})

router.get('/:id',function(req,res){
    db.Campaign.findOne({
        where:{
            id:req.params.id
        },
        include:[db.Account]
    }).then(data=>{
        res.status(200).json(data);
    }).catch(err => res.sendStatus(500))
})

router.post('/',function(req,res){
    db.Campaign.create(req.body).then(data => {
        res.status(200).json(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
})

router.put('/',function(req,res){
    db.Campaign.update(req.body,{where:{id:req.body.id}}).then(data => {
        res.status(200).json(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
})

router.delete('/:id',function(req,res){
    db.Campaign.destroy({where:{id:req.params.id}}).then(data => {
      if(data.affectedRows === 0) res.status(404).send("Not Found")  
      res.status(200).json(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
})

module.exports = router;
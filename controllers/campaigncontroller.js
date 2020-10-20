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

router.get('/:id/characters',function(req,res){
    db.Campaign.findByPk(req.params.id).then(data =>
    
    data.getCharacters().then(chars=>{
        res.status(200).json(chars);
    }).catch(err => res.sendStatus(500)))
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

router.put('/:id/characters', function (req, res) {
    db.Character.findByPk(req.body.id).then(char =>
        db.Campaign.findByPk(req.params.id).then(campaign => campaign.addSpell(char)).then(result => {
            res.status(200).json(result);
        }).catch(err => res.sendStatus(500)))
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
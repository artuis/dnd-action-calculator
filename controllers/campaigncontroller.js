const express = require("express");
const router = express.Router();
const db = require("../models")

//may not be right
router.get('/',function(req,res){
    db.Campaign.findAll({include:{all:true}}).then(data=>{
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
    if(req.session.user) {
        db.Campaign.create({
            name:req.body.name,
            AccountId:req.session.user.id
        }).then(newCamp => {
            res.status(200).json(newCamp)
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err);
        })
    }
    else {
        res.status(401).send("not logged in")
    }
})

router.put('/',function(req,res){
    if(req.session.user) {
        db.Campaign.findByPk(req.body.id).then(camp => {
            if(!camp) {
                return res.status(404).send("no such character")
            }
            else if(camp.AccountId===req.session.user.id) {
                db.Camp.update(req.body,{
                    where:{
                        id:req.body.id
                    }
                }).then(editCamp => {
                    res.json(editCamp)
                }).catch(err=>{
                    res.status(500).send("Server Error")
                })
            }
            else {
                res.status(401).send("not logged in")
            }
        })
    }
})

router.put('/:id/characters', function (req, res) {
    db.Character.findByPk(req.body.id).then(char =>
        db.Campaign.findByPk(req.params.id).then(campaign => campaign.addCharacter(char)).then(result => {
            res.status(200).json(result);
        }).catch(err => res.sendStatus(500)))
})

router.delete('/:id',function(req,res){
    if(req.session.user) {
        db.Campaign.findByPk(req.params.id).then(camp => {
            if(camp.AccountId === req.session.user.id) {
                db.Campaign.destroy({
                    where: {
                        id:req.params.id
                    }
                }).then(delCamp => {
                    res.json(delCamp);
                })
            }
            else {
                res.status(401).send("cannot delete")
            }
        })
    }
    else {
        res.status(401).send("not logged in")
    }
})

module.exports = router;
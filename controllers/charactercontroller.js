const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/',function(req,res){
    db.Character.findAll({
      include:{all:true,nested:true}
    }).then(data=>{
        res.status(200).json(data);
    }).catch(err => res.sendStatus(500))
})

router.get('/:id',function(req,res){
  db.Character.findOne({
    where:{
      id:req.params.id
    },
    include:{all:true,nested:true}
  }).then(data=>{
      res.status(200).json(data);
  }).catch(err => res.sendStatus(500))
})

router.post('/',function(req,res){
    if(req.session.user) {
        if(req.body.WeaponId === "") req.body.WeaponId = null;
        db.Character.create({
            name: req.body.name,
            player_name: req.body.player_name,
            experience: req.body.experience,
            level: req.body.level,
            strength:req.body.strength,
            dexterity: req.body.dexterity,
            constitution: req.body.constitution,
            intelligence: req.body.intelligence,
            wisdom: req.body.wisdom,
            charisma: req.body.charisma,
            perception: req.body.perception,
            initiative: req.body.initiative,
            hp_current: req.body.hp_current,
            hp_temp: req.body.hp_temp,
            hp_max: req.body.hp_max,
            armor_class: req.body.armor_class,
            shield: req.body.shield,
            WeaponId: req.body.WeaponId,
            ClassId: req.body.ClassId,
            RaceId: req.body.RaceId,
            AccountId: req.session.user.id
        },{
            omitNull: false
        }).then(newChar => {
            res.status(200).json(newChar)
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
        db.Character.findByPk(req.body.id).then(char => {
            if(!char) {
                return res.status(404).send("no such character")
            }
            else if(char.AccountId===req.session.user.id) {
                if(req.body.WeaponId === "") req.body.WeaponId = null;
                db.Character.update(req.body,{
                    where:{
                        id:req.body.id
                    },
                    omitNull: false
                }).then(editChar => {
                    res.json(editChar)
                }).catch(err=>{
                    console.log(err)
                    res.status(500).send("Server Error")
                })
            }
            else {
                res.status(401).send("not logged in")
            }
        })
    }
    
})

router.delete('/:id',function(req,res){
    if(req.session.user) {
        db.Character.findByPk(req.params.id).then(char => {
            if(char.AccountId === req.session.user.id) {
                db.Character.destroy({
                    where: {
                        id:req.params.id
                    }
                }).then(delChar => {
                    res.json(delChar);
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
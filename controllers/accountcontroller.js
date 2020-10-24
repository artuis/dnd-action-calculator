const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt")
const sendEmail = require("./mailercontroller")

router.get('/:id/characters',function(req,res){
  db.Account.findByPk(req.params.id).then(data =>
  
  data.getCharacters().then(chars=>{
      res.status(200).json(chars);
  }).catch(err => res.sendStatus(500)))
})

router.get('/:id/campaigns',function(req,res){
  db.Account.findByPk(req.params.id).then(data =>
  
  data.getCampaigns().then(camps=>{
      res.status(200).json(camps);
  }).catch(err => res.sendStatus(500)))
})

router.post('/signup',function(req,res){
    db.Account.create(req.body).then(newAccount => {
        req.session.user = {
            email: newAccount.email,
            id: newAccount.id
        }
        sendEmail(newAccount.email);
        res.redirect("/campaigns")
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
})

router.post('/login',function(req,res){
    db.Account.findOne({
        where: {email: req.body.email}
    }).then(acc => {
        //check if user entered pass matches db pass
        if(!acc) {
            req.session.destroy();
            return res.status(401).send('incorrect email or password')
        }
        else if(bcrypt.compareSync(req.body.password, acc.password)) {
            req.session.user = {
                email: acc.email,
                id:acc.id
            }
            return res.redirect('/campaigns')
        }
        else {
            req.session.destroy();
            return res.status(401).send('incorrect email or password')
        }
    })
})

router.get("/logout", (req,res) => {
    req.session.destroy();
    return res.redirect('/')
})

router.get("/sessiondata", (req,res) => {
    res.json(req.session);
})

//might disable these routes
router.put('/',function(req,res){
    db.Account.update(req.body,{where:{id:req.body.id}}).then(data => {
        res.status(200).json(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
})

router.delete('/:id',function(req,res){
    db.Account.destroy({where:{id:req.params.id}}).then(data => {
      if(data.affectedRows === 0) res.status(404).send("Not Found")  
      res.status(200).json(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
})

module.exports = router;
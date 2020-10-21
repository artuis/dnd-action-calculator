const express = require("express");
const router = express.Router();
const db = require("../models")

//may not be right
router.get('/', function (req, res) {
    db.Class.findAll({}).then(data => {
        res.status(200).json(data);
    }).catch(err => res.sendStatus(500))
})

router.get('/:id/spells', function (req, res) {
    db.Class.findByPk(req.params.id).then(data =>

        data.getSpells().then(spells => {
            res.status(200).json(spells);
        }).catch(err => res.sendStatus(500)))
})

router.post('/', function (req, res) {
    db.Class.create(req.body).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

router.put('/', function (req, res) {
    db.Class.update(req.body, { where: { id: req.body.id } }).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

router.put('/:id/spells', function (req, res) {
    db.Spell.findByPk(req.body.id).then(spell =>
        db.Class.findByPk(req.params.id).then(cls => cls.addSpell(spell)).then(result => {
            res.status(200).json(result);
        }).catch(err => res.sendStatus(500)))
})

router.delete('/:id', function (req, res) {
    db.Class.destroy({ where: { id: req.params.id } }).then(data => {
        if (data.affectedRows === 0) res.status(404).send("Not Found")
        res.status(200).json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

module.exports = router;
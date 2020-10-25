
module.exports = function(app) {
    
    const db = require("../models")
    app.get("/", (req, res) => {
        console.log("GET index page")
        res.render("index",{user:req.session.user});
    });

    app.get("/campaigns", (req, res) => {
        console.log("GET campaign page")
        if(!req.session.user) {
            return res.status(401).redirect("/")
        } 
        db.Campaign.findAll({
            where: {
                AccountId: req.session.user.id,
            },
            include: db.Character
        }).then(campaigns => {
            db.Character.findAll({
                where: {
                    AccountId: req.session.user.id,
                },
            }).then (characters => {
                db.Class.findAll({}).then(classes => {
                    db.Race.findAll({}).then(races => {
                        db.Weapon.findAll({}).then(weapons => {
                            res.render("campaigns", { 
                                campaigns: campaigns,
                                characters: characters,
                                races: races,
                                classes: classes,
                                weapons: weapons,
                                user: req.session.user 
                            });
                        })
                        
                    })
                })
            })
            
        }).catch(err => res.sendStatus(500));
    });
    
    app.get("/login", (req, res) => {
        console.log("GET login page")
        res.render("login");
    });
    app.get("/account", (req, res) => {
        console.log("GET account page")
        res.render("account");
    });
}
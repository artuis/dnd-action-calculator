
module.exports = function(app) {
    const characters1 = [{id: 1, name : "Player 1"}, {id: 2, name : "Player 2"}, {id: 3, name : "Player 3"}, {id: 4, name : "Player 4"}];
    const characters2 = [{id: 1, name : "Player 5"}, {id: 2, name : "Player 6"}, {id: 3, name : "Player 7"}, {id: 4, name : "Player 8"}];
    const characters3 = [{id: 1, name : "Player 9"}, {id: 2, name : "Player 10"}, {id: 3, name : "Player 11"}, {id: 4, name : "Player 12"}];
    const data = [{id : 1, name : "Campaign 1", characters : characters1}, {id : 2, name : "Campaign 2", characters : characters2},{id : 3, name : "Campaign 3", characters : characters3}]
    app.get("/", (req, res) => {
        console.log("GET index page")
        res.render("index");
    });
    app.get("/campaigns", (req, res) => {
        console.log("GET campaign page")
        res.render("campaigns", { campaigns: data });
    });
    
    app.get("/login", (req, res) => {
        console.log("GET login page")
        res.render("login");
    });
    app.get("/account", (req, res) => {
        console.log("GET account page")
        res.render("account");
    });
    app.post("/account", (req, res) => {
        console.log(req.body)
        res.json(req.body)
    });
}
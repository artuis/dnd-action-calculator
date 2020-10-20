module.exports = function(app) {
    const characters = [{id: 1, name : "Player 1"}, {id: 2, name : "Player 2"}, {id: 3, name : "Player 3"}, {id: 4, name : "Player 4"}];
    const data = [{id : 1, name : "Campaign 1", characters : characters}, {id : 2, name : "Campaign 2", characters : characters},{id : 3, name : "Campaign 3", characters : characters}]
    app.get("/", function(req, res) {
        console.log("GET home page")
        res.render("index", { campaigns: data });
    });
}
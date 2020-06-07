var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  
app.get("/api/notes", function (req, res){
    var serverData = fs.readFileSync("./db/db.json");
    var parsedData = JSON.parse(serverData);
    return res.json(parsedData);
})

app.post("/api/notes", function(req, res){
    var newServerData = req.body;
    
    newServerData.id = Date.now();
    var serverData = fs.readFileSync("./db/db.json");
    var parsedData = JSON.parse(serverData);
    parsedData.push(newServerData);
    fs.writeFileSync("./db/db.json", JSON.stringify(parsedData));

})

app.delete("/api/notes/:id", function(req, res){
    var serverData = fs.readFileSync("./db/db.json");
    var parsedData = JSON.parse(serverData);
    var stringId = req.params.id;
    var deleteId = parseInt(stringId);
    for (var i =0; i < parsedData.length; i++){
        if(parsedData[i].id === deleteId) {
            parsedData.splice(i, 1);
        }
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(parsedData));
    res.json(parsedData);


})




  app.listen(PORT, function () {
    console.log("App listening on: http://localhost:" + PORT);
  });
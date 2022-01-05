var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = 4000;
var dbMethods = require("./database/databasepouchdb");
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/getrequest", function (req, res) {
    dbMethods.allDocs().then(function (doc) {
        res.send(doc.rows.map(function (doc) { return ({
            id: doc.doc._id,
            text: doc.doc.text,
            message: doc.doc.message
        }); }));
    });
});
app.post("/postitem", function (req, res) {
    dbMethods.post(req.body).then(function (x) { return res.send(x.id); });
});
app.post("/deleteitem", function (req, res) {
    dbMethods.deleteItem(req.body.id).then(function (x) { return res.send(x); });
});
app.listen(port, function () {
    console.log("App listen on port " + port + ".");
});

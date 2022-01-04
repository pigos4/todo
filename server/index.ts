import express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 4000;
const dbMethods = require("./database/databasepouchdb");
const proxy = require("http-proxy-middleware");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "build")));



app.get("/getrequest", function (req, res) {
  dbMethods.allDocs().then((doc: any) => {
    res.send(
      doc.rows.map((doc: any) => ({
        id: doc.doc._id,
        text: doc.doc.text,
        message: doc.doc.message,
      }))
    );
  });
});
app.post("/postitem", (req: any, res: any) => {
  dbMethods.post(req.body).then((x: any) => res.send(x.id));
});

app.post("/deleteitem", (req: any, res: any) => {
  dbMethods.deleteItem(req.body.id).then((x: any) => res.send(x));
});

const PORT = process.env.PORT || 4000; //Heroku sets port dynamically
app
  .listen(PORT, () => {
    console.log("listening...");
  })
  .on("error", (err) => {
    console.log(`Error Code: ${err}`);
  });

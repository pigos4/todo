import express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const dbMethods = require("./database/databasepouchdb");
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log(`App listen on port ${port}.`);
});

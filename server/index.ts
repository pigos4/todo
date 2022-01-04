import express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const dbMethods = require("./database/databasepouchdb");
const proxy = require("http-proxy-middleware");
//require("./routes")(app);
module.exports = function (app:any) {
  // add other server routes to path array
  app.use(proxy(["/api"], { target: "http://localhost:4000" }));
};

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  // Add production middleware such as redirecting to https

  // Express will serve up production assets i.e. main.js
  app.use(express.static(__dirname + "/client/build"));
  // If Express doesn't recognize route serve index.html
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
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

const PORT = process.env.PORT || 4000; //Heroku sets port dynamically
app
  .listen(PORT, () => {
    console.log("listening...");
  })
  .on("error", (err) => {
    console.log(`Error Code: ${err}`);
  });

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

const app = express();

// middleware------
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l6x9t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db("clean-co").collection("services");
    console.log("db is connected ");

    //
    // app.get("/get-services", async (req, res) => {
    //   const services = await serviceCollection.find({}).toArray();
    //   res.send(services);
    // });
    app.post("/add-services", async (req, res) => {
      console.log(req.body);
      const datum = req.body;
      const result = await serviceCollection.insertOne(datum);
      res.send(result);
    });
  } finally {
    //
  }
}
run().catch(console.dir);
//
app.get("/", (req, res) => {
  res.send("Hello there");
});

app.listen(port, () => {
  console.log("listening from", port);
});

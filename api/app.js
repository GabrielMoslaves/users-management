const express = require("express");
const app = express();
const db = require("./db/connection");
const bodyParser = require("body-parser");
const PORT = 3000;

app.listen(PORT, () => console.log(`Aplicação rodando na porta: ${PORT} `));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//bodyparser
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

//db connection
db.authenticate()
  .then(() => console.log("db autenticado"))
  .catch((err) => console.log(err));

//routes
app.get("/", (req, res) => res.send("wdawd"));

//user routes
app.use("/user", require("./routes/Users"));

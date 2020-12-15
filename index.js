//instatiate express module
const express = require("express");

//use express in app variable
const app = express();

//import route module
const router = require("./src/routes");

//define the server port
const port = 5000;

//use bodyparser
app.use(express.json());

app.use("/api/v1", router);

app.listen(port, () => console.log(`Connected to port ${port}`));

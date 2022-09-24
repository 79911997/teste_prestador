const express = require("express");
const cors = require("cors");
const servicos = require("../routes/servicos");

const app = new express();

app.use(cors());
app.use(express.json());

app.use("/servicos", servicos);

app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).send({
        error: true,
        content: err
    });
})


module.exports = app;
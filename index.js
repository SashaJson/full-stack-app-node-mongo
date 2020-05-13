const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
const todoRoutes = require("./routes/todos");
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

//app.use(cors());
app.engine("hbs", hbs.engine) // registered engineer with key hbs
app.set("view engine", "hbs")
app.set("views", "views")

app.use(express.urlencoded({extended: true}));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))
app.use(todoRoutes);

async function start() {
    try {
        await mongoose.connect(
            "mongodb+srv://SashaJson:123456qwerty@cluster0-52oej.mongodb.net/todos",
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        )

        app.listen(PORT, () => {
            console.log("Server has been started...")
        })

    } catch (e) {
        console.log(e)
    }
}


start()
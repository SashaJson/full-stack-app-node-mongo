'use strict';

// TODO REFACTOR THIS MODULE

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routes/todos');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine); // registered engineer with key hbs
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(todoRoutes);

async function start() {
    try {
        await mongoose.connect(
            "mongodb+srv://<name>:<password>@cluster0-52oej.mongodb.net/todos",
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        );

        app.listen(PORT, () => {
            console.log('Server has been started...');
        });

    } catch (e) {
        console.log(e);
    }
}

start();

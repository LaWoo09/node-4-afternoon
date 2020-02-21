require("dotenv").config()
const express = require("express");
const app = express();
const session = require('express-session');
const checkForSession = require("./middlewares/checkForSession");
const authCtrl = require('../server/controllers/authController');
const srchCtrl = require('../server/controllers/searchController');
const cartCtrl = require('../server/controllers/cartController');
const swagCtrl = require('../server/controllers/swagController');
const { SESSION_SECRET, SERVER_PORT } = process.env;
const port = SERVER_PORT || 3005


app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 100 * 60 * 60 * 24 * 14
    }
}))


app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);

app.get('/api/swag', swagCtrl.read)

app.get('/api/search', srchCtrl.search);

app.post('/api/cart/checkout', cartCtrl.checkout);
app.post('/api/cart/:id', cartCtrl.add);
app.delete('/api/cart/:id', cartCtrl.delete);



app.listen(port, () => {
    console.log(`listening on port, ${port}`)
})

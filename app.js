const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database.js').MongoConnect;

const User = require('./models/user');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouter = require('./router/adminRouter');
const shopRouter = require('./router/shopRouter');
const errorController = require('./controllers/error.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6159c83cab75ac2c4be4772a')
        .then()
})

app.use('/admin', adminRouter)
app.use(shopRouter);

app.use(errorController.getError);

mongoConnect(() => {
    app.listen(3000)
})
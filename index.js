// Stock Market Portfolio App - By Mike Jackson

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// user boby parser middleware
app.use(bodyParser.urlencoded({extended: false}));


// API KEY pk_4b6e2ea3335b4464bece69e5e71b581a
// create call_api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_4b6e2ea3335b4464bece69e5e71b581a', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
    
        if (res.statusCode === 200) {
            // console.log(body);
            finishedAPI(body);
        };
    });
}

// Set Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is other stuff..."

// Set handlebar index GET route
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    }, "ibm");
});

// Set handlebar index POST route
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
        // posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);
});

app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server listening on port ' + PORT));
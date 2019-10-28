var express = require('express');
var app = express();
var fs = require("fs");

var file = __dirname + "/assets/" + "Resources.json";

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/Products', function (req, res) {
    fs.readFile(file, 'utf8', function (err, data) {

        console.log(data);

        let resource = JSON.parse(data);

        let products = resource.Products;

        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(products));
    });
})

app.post('/addProduct', function (req, res) {

    console.log(req.body);

    // First read existing users.
    fs.readFile(file, 'utf8', function (err, data) {

        let objects = JSON.parse(data);

        objects.Products.push(req.body);

        fs.writeFile(file, JSON.stringify(objects), (err) => {

            if (err) throw err;
            console.log('Data written to file');
        });

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ result: true }));
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

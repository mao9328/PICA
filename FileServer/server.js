var express = require('express');
var moment = require('moment');
var cors = require('cors');
var app = express();
const fileupload = require('express-fileupload')

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//handle files
app.use(fileupload());

//handle cors
app.use(cors());

app.post('/saveImage', (req, res) => {

    let prefix = moment().unix();

    const image = req.files.file;
    const path = __dirname + '/images/' + prefix + image.name;

    image.mv(path, (error) => {

        if (error) {

            res.writeHead(500, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({ status: 'error', message: error }));

            return;
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({ path: '/images/' + image.name }));
    })
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

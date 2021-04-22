const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
let port = process.env.PORT || 3001;
const fs = require('fs');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); // This will help in encoding.
app.use(bodyParser.json()); // this will support json format

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/Angular10FirebaseStorage'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname+'/dist/Angular10FirebaseStorage/index.html'));
});


const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});
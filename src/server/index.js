const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('isomorphic-fetch');
const mockAPIResponse = require('./mockAPI.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});

app.post('/api', async function (req, res, next) {
    try {
        const userInput = req.body.url;
        console.log(`You entered: ${userInput}`);
        const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`;

        const response = await fetch(apiURL);
        const mcData = await response.json();
        console.log(mcData);
        res.send(mcData);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
const apiKey = process.env.API_KEY;

// designates what port the app will listen to for incoming requests

app.listen(8090, function () {
    console.log('app listening on port 8090');
});
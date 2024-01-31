const express = require('express'); 
const bodyParser = require('body-parser')
const db = require("./db_connection")

const app = express();

db.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (request, response) => {
    return response.json({message: 'Hello World'});
});

app.get('/pessoas/:id', (request, response) => {
    console.log(request.params.id)
    return response.json({message: 'Hello World'});
});

app.post('/pessoas', (request, response) => {
    console.log(request.body);
    return response.status(404).send({message: 'Falhou'});
});

app.listen(3333, () => {
    console.log("Server ok");
}).on('error', function(err) {
    console.log(`Falhou: ${err}`);
});

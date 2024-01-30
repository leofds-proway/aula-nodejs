const express = require('express'); 
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (request, response) => {
    return response.json({message: 'Hello World'});
});

app.post('/pessoas', (request, response) => {
    console.log(request.body);
    return response.status(404).send({message: 'Falhou'});
});

app.listen(3333);
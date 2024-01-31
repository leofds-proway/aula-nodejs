const express = require('express'); 
const bodyParser = require('body-parser')
const db = require("./db_connection")

const app = express();

db.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/pessoas', async (request, response) => {
    let sql = "select * from pessoa;";
    try {
        let result = await db.query(sql);
        return response.status(200).send(result);
    } catch (e) {
        return response.status(500).send(e);
    }
});

app.get('/pessoas/:id', async (request, response) => {
    let sql = "select * from pessoa where id = ?;";
    try {
        let result = await db.query(sql,[request.params.id]);
        if(result && result.length > 0) {
            return response.status(200).send(result[0]);
        } else {
            return response.status(404).send({message: "Não encontrado"});
        }
    } catch (e) {
        return response.status(500).send(e);
    }
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

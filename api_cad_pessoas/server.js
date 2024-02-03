const express = require('express'); 
const bodyParser = require('body-parser')
const db = require("./db_connection")
var cors = require('cors')

const app = express();

db.connect();

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/pessoas', async (request, response) => {
    let sql = "select * from pessoas;";
    try {
        let result = await db.query(sql);
        result.forEach(element => {
            element.estadoCivil = element.estadoCivil == 1 ? true : false
        });
        return response.status(200).send(result);
    } catch (e) {
        return response.status(500).send(e);
    }
});

app.get('/pessoas/:id', async (request, response) => {
    let sql = "select * from pessoas where id = ?;";
    try {
        let result = await db.query(sql,[request.params.id]);
        if(result && result.length > 0) {
            let pessoa = result[0];
            pessoa.estadoCivil = pessoa.estadoCivil == 1 ? true : false;
            return response.status(200).send(pessoa);
        } else {
            return response.status(404).send({message: "Id não existe"});
        }
    } catch (e) {
        return response.status(500).send(e);
    }
});

app.post('/pessoas', async (request, response) => {
    let sql = "insert into pessoas (nome, telefone, email, estadoCivil) values (?,?,?,?);";
    try {
        if( request.body.nome === undefined || 
            request.body.telefone === undefined ||
            request.body.email  === undefined ||
            request.body.estadoCivil  === undefined) {
            response.status(404).send({message: "Campo inválido"});
            return;
        }

        let result = await db.query(sql,[request.body.nome, request.body.telefone, request.body.email, request.body.estadoCivil]);
        if(result.affectedRows == 1) {
            let body = {
                id: result.insertId,
                ... request.body
            };
            return response.status(201).send(body);
        } else {
            return response.status(400).send({message: "Falha ao salvar"});
        }
    } catch (e) {
        return response.status(500).send(e);
    }
});

app.put('/pessoas/:id', async (request, response) => {
    let sql = "update pessoas set nome = ?, telefone = ?, email = ?, estadoCivil = ? where id = ?;";
    try {
        if( request.body.nome === undefined || 
            request.body.telefone === undefined ||
            request.body.email  === undefined ||
            request.body.estadoCivil  === undefined) {
            response.status(404).send({message: "Campo inválido"});
            return;
        }

        let result = await db.query(sql,[request.body.nome, request.body.telefone, request.body.email, request.body.estadoCivil, request.params.id]);
        if(result.affectedRows == 1) {
            let body = {
                id: parseInt(request.params.id),
                ... request.body
            };
            return response.status(200).send(body);
        } else {
            return response.status(404).send({message: "Id não existe"});
        }
    } catch (e) {
        return response.status(500).send(e);
    }
});

app.delete('/pessoas/:id', async (request, response) => {
    let sql = "delete from pessoas where id = ?;";
    try {
        let result = await db.query(sql,[request.params.id]);
        if(result.affectedRows == 1) {
            return response.status(200).send();
        } else {
            return response.status(404).send({message: "Id não existe"});
        }
    } catch (e) {
        return response.status(500).send(e);
    }
});

app.listen(3333, () => {
    console.log("Server ok");
}).on('error', function(err) {
    console.log(`Falhou: ${err}`);
});

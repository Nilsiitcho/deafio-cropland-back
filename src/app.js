const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));

let proximoID = 3;

const registros = [
    {
        id: 1,
        descricao: 'Exemplo Receitaa',
        tipo: 'RECEITA',
        vencimento: '19-09-2022',
        valor: 1000.00,
    },
    {
        id: 2,
        descricao: 'EXEMPLO DESPESA',
        tipo: 'DESPESA',
        vencimento: '05-02-2022',
        valor: 520.00,
    }
]

app.get('/', (req, res) => {
    res.send('TESTE!')
})

app.get('/registros', (req, res) => {
    res.send(registros);
})

app.post('/registros', (req, res) => {
    const novoRegistro = req.body;
    novoRegistro.id = proximoID;
    registros.push(novoRegistro);
    proximoID++;
    res.send(novoRegistro);
})

app.delete('/registros/:id', (req, res) => {
    const {id} = req.params;

    const index = registros.findIndex(element => {
        return element.id === Number(id);
    });

    if(index < 0){
        return res.status(500).send(`Elemento com o id ${id} não encontrado`);
    }

    const elemento = registros[index];
    registros.splice(index, 1);

    res.send(elemento);
})

app.put('/registros/:id', (req, res) => {
    const {id} = req.params;
    const camposAtualizar = req.body;

    const index = registros.findIndex(element => {
        return element.id === Number(id);
    });

    if(index < 0){
        return res.status(500).send(`Elemento com o id ${id} não encontrado`);
    }

    const elementoAtualizado = registros[index];

    if(camposAtualizar.descricao){
        elementoAtualizado['descricao'] = camposAtualizar.descricao
    }

    if(camposAtualizar.tipo){
        elementoAtualizado['tipo'] = camposAtualizar.tipo
    }

    if(camposAtualizar.vencimento){
        elementoAtualizado['vencimento'] = camposAtualizar.vencimento
    }

    if(camposAtualizar.valor){
        elementoAtualizado['valor'] = camposAtualizar.valor
    }

    registros.splice(index, 1, elementoAtualizado);

    res.send(elementoAtualizado);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

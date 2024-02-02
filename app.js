const pool = require('./connection.js')
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
app.use(bodyParser.json());

//get all pokemon
app.get('/pokemon_tracker', (req, res)=>{
    pool.query(`Select * from pokemon_tracker`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    pool.end;
})
pool.connect();

//get pokemon by id
app.get('/pokemon_tracker/:id', (req, res)=>{
    pool.query(`Select * from pokemon_tracker where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    pool.end;
})
pool.connect();

//add new pokemon
app.post('/pokemon_tracker', (req, res)=> {
    const pokemon_tracker = req.body;
    let insertQuery = `insert into pokemon_tracker(id, name, type, description) 
                       values(${pokemon_tracker.id}, '${pokemon_tracker.name}', '${pokemon_tracker.type}', '${pokemon_tracker.description}')`

    pool.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    pool.end;
})

//update pokemon
app.put('/pokemon_tracker/:id', (req, res)=> {
    let pokemon_tracker = req.body;
    let updateQuery = `update pokemon_tracker
                       set name = '${pokemon_tracker.name}',
                       type = '${pokemon_tracker.type}',
                       description = '${pokemon_tracker.description}'
                       where id = ${pokemon_tracker.id}`

    pool.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    pool.end;
})

//delete
app.delete('/pokemon_tracker/:id', (req, res)=> {
    let insertQuery = `delete from pokemon_tracker where id=${req.params.id}`

    pool.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    pool.end;
})

app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300");
})

pool.connect();
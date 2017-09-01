const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = mongoose.createConnection('mongodb://localhost/sports-figures-db');

const sportsFigure = require('./sportsFigure.js')(db);

app.use(bodyParser.json());

//root route
app.get('/api/sportsfigure', function(req, res){
  console.log('Received request for sportsfigures');
  sportsFigure.find()
  .then(function(dbFigures){
    return res.json(dbFigures);
  })
  .catch(function(err){
    console.log(err);
    res.setStatus(500).end('Error with DB query');
  });
});

app.post('/api/sportsfigure', function(req,res){
  let newSportsFigure = new sportsFigure(req.body);
  newSportsFigure.save()
    .then(dbResult=>{
      console.log(dbResult);
      res.setStatus(201).json(dbResult);
    })
    .catch(err=>{
      console.log(err);
      res.setStatus(500).send('error');
    })
});

app.delete('/api/sportsfigure:id', function(req,res){
  let query = `DELETE FROM sportsfigure WHERE id=${req.params.id}`;
  connection.query(query, function(err, rows) {
    if(err){
      console.log(err);
      return res.sendStatus(500);//internal server error status code
    }
    res.send('Success deleting id: ' +id);
  });
});

app.listen(1338, ()=>console.log('Heyo!!!!'));

const express = require('express');
const axios = require('axios');
const app = express();

var setgrid = 3**2


app.set('view engine', 'pug');
app.use(express.static(__dirname ));
app.get('/', async (req, res) => {
  res.render('index');
});

app.listen(3000)
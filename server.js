require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require("cors");

//Enable All CORS Requests  
app.use([express.json({ extended: false }), cors()]);

const PORT = process.env.PORT || 4000;

const api = axios.create({
  method: 'GET',
  baseURL: 'https://pro-api.coinmarketcap.com',
  headers: {
    'X-CMC_PRO_API_KEY': `${process.env.COINMARKETCAP_API_KEY}`,
    Accept: 'application/json',
  },
});

//confirm server is working
app.get('/', function(req, res){
    res.json({"message": "Hello World"});
});

//api route to coinmarketcap
app.get('/api', (req, res) => {
  api('/v1/cryptocurrency/listings/latest?limit=20')
  .then(function (response) {
    console.log(response.data)
    res.json(response.data);
  })
  .catch(function (error) {
    console.log(error)
    res.json(error);
  });
});

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

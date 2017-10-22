const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());
app.use( (req, res, next) => {
    "use strict";
    // https://www.w3.org/TR/cors/#access-control-allow-origin-response-header
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

Farmer = require('./models/farmer');


// Connect to Mongoose
mongoose.connect('mongodb://localhost/farmerlist', { useMongoClient: true })
const db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/farmers');
});

app.get('/api/farmers', (req, res) => {
	Farmer.getFarmers((err, farmers) => {
		if(err){
			throw err;
		}
		res.json(farmers);
	});
});

app.get('/api/farmers/:_id', (req, res) => {
	Farmer.getFarmerById(req.params._id, (err, farmer) => {
		if(err){
			throw err;
		}
		res.json(farmer);
	});
});

app.post('/api/farmers', (req, res) => {
	var farmer = req.body;
	Farmer.addFarmer(farmer, (err, farmer) => {
		if(err){
			throw err;
		}
		res.json(farmer);
	});
});

app.put('/api/farmers/:_id', (req, res) => {
	const id = req.params._id;
	const farmer = req.body;
	Farmer.updateFarmer(id, farmer, {}, (err, farmer) => {
		if(err){
			throw err;
		}     
		res.json(farmer);
	});
});

app.delete('/api/farmers/:_id', (req, res) => {
	var id = req.params._id;
	Farmer.removeFarmer(id, (err, farmer) => {
		if(err){
			throw err;
		}
		res.json(farmer);
	});
});

app.listen(3000);
console.log('Running on port 3000...');

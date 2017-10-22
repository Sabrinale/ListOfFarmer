const mongoose = require('mongoose');

// farmer Schema
const farmerSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	phoneNumber:{
		type: String,
		required: true
	},
	gender:{
		type: String
	}
});

const Farmer = module.exports = mongoose.model('Farmer', farmerSchema);

// Get Farmers
module.exports.getFarmers = (callback, limit) => {
	Farmer.find(callback).limit(limit);
}

// Get Farmer
module.exports.getFarmerById = (id, callback) => {
	Farmer.findById(id, callback);
}

// Add Farmer
module.exports.addFarmer = (farmer, callback) => {
	Farmer.create(farmer, callback);
}

// Update Farmer
module.exports.updateFarmer = (id, farmer, options, callback) => {
	var query = {_id: id};
	var update = {
		name: farmer.name, 
		phoneNumber: farmer.phoneNumber,
		gender: farmer.gender
	}
	Farmer.findOneAndUpdate(query, update, options, callback);
}

// Delete Farmer
module.exports.removeFarmer = (id, callback) => {
	var query = {_id: id};
	Farmer.remove(query, callback);
}
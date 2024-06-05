const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true },
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    

    
    passengerCount: { type: Number, required: true },
    ticketPrice: { type: Number, required: true },
    status: { type: String, required: true },
    currency: { type: String, required: true},// enum: ['USD', 'EUR', 'GBP'] }, // enum for allowed currency values
    flightClass: { type: String, required: true}, //enum: ['Economy', 'Business', 'First'] }, // enum for flight class
    image: { type: String, required: true },
}, { timestamps: true }); // Include timestamps for createdAt and updatedAt fields

const carModel = mongoose.model('Car', carSchema);

module.exports = carModel;

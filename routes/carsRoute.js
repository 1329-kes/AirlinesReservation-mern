const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res) => {
  try {
    // Log the request body
    const newcar = new Car(req.body);
    await newcar.save();
    res.send("Car added successfully");
  } catch (error) {
    console.error('Error adding car:', error); // Log the error details
    return res.status(400).json({ error: error.message });
  }
});

router.post("/editcar", async (req, res) => {
  try {
    
    const car = await Car.findOne({ _id: req.body._id });

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    car.flightNumber = req.body.flightNumber;
    car.departureAirport = req.body.departureAirport;
    car.image = req.body.image;
    car.arrivalAirport = req.body.arrivalAirport;
    car.departureTime = req.body.departureTime;
    car.arrivalTime = req.body.arrivalTime;
    car.passengerCount = req.body.passengerCount;
    car.ticketPrice = req.body.ticketPrice;
    car.status = req.body.status;
    car.currency = req.body.currency;
    car.flightClass = req.body.flightClass;

    

    await car.save();

    res.status(200).json({ message: "Flight details updated successfully", car });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("flight deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

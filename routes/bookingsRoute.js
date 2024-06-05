const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51IYnC0SIR2AbPxU0EiMx1fTwzbZXLbkaOcbc2cXx49528d9TGkQVjUINJfUDAnQMVaBFfBDP5xtcHCkZG1n1V3E800U7qXFmGf");

router.post("/bookcar", async (req, res) => {
  try {
    const { token, calculatedTotalAmount, car, bookedTimeSlots, user, totalHours, businessClass,name,mobileNo } = req.body;

    // Adding debug logging
    console.log("Request body:", req.body);

    // Validate input data
    if (!token || !calculatedTotalAmount || !car || !bookedTimeSlots || !user || !totalHours || !name || !mobileNo ) {
      throw new Error("Invalid request data");
    }

    console.log("Creating customer...");
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const ParsedTotalAmount = parseFloat(calculatedTotalAmount) ; // Convert to smallest currency unit

    if (isNaN(ParsedTotalAmount)) {
      throw new Error("Invalid total amount");
    }

    console.log("Creating charge...");
    const payment = await stripe.charges.create({
      amount: ParsedTotalAmount,
      currency: "INR",
      customer: customer.id,
      receipt_email: token.email,
    }, {
      idempotencyKey: uuidv4(),
    });

    if (!payment) {
      throw new Error("Payment failed");
    }

    console.log("Payment successful, saving booking...");
    req.body.transactionId = payment.id;

    const newBooking = new Booking({
      car,
      user,
      totalHours,
      totalAmount: ParsedTotalAmount, // Convert back to main currency unit
      transactionId: [bookedTimeSlots],
      
      businessClass,
      name,
      mobileNo,
      
        
       // Ensure passengers is always an array
      
    });

    await newBooking.save();
    console.log("Booking saved.");

    const bookedCar = await Car.findById(car);
    if (!Array.isArray(bookedCar.bookedTimeSlots)) {
      bookedCar.bookedTimeSlots = [];
    }
    bookedCar.bookedTimeSlots.push(bookedTimeSlots);
    await bookedCar.save();
    console.log("Flight updated with new booking slots.");

    res.status(200).json({ message: "Your booking is successful" });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Failed to book car", error: error.message });
  }
});

router.get("/getallbookings", async(req, res) => {

  try {

      const bookings = await Booking.find().populate('car')
      res.send(bookings)
      
  } catch (error) {
      return res.status(400).json(error);
  }
});

router.delete('/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.remove();
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

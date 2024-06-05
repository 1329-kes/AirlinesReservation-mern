const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
 // transactionId: {type:String},
 
  
    
  


  
  seatNumbers: [{ type: String }],
  totalAmount: { type: Number },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  bookingDate: { type: Date, default: Date.now },
  departureDate: { type: Date },
  arrivalDate: { type: Date },
  name: {type:String},
  mobileNo:{type:Number},


  
  
  status: { type: String, enum: ['Booked', 'Cancelled'], default: 'Booked' },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

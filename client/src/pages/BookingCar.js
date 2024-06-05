import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from 'aos';

import 'aos/dist/aos.css'; // You can also use <link> for styles
const { RangePicker } = DatePicker;
function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const[totalHours,setTotalHours]=useState(0);
  const [totalPassengers  , setTotalPassengers] = useState(0);
  const [businessClass, setBusinessClass] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [passengerName, setPassengerName] = useState("");
const [mobileNumber, setMobileNumber] = useState("");


  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id == match.params.carid));
    }
  }, [cars]);



 
  useEffect(() => {
    let totalAmount = seatsToBook* car.ticketPrice;
    if (businessClass) {
      totalAmount += 100 * seatsToBook;
    }
    setTotalAmount(totalAmount);
  }, [businessClass, totalHours, seatsToBook, car]);
  
  // Function to handle changes in the number of seats to book
  function handleSeatsChange(e) {
    const selectedSeats = parseInt(e.target.value, 10);
    setSeatsToBook(selectedSeats);
  }

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  

  function onToken(token){
    const reqObj = {
        token,
        user: JSON.parse(localStorage.getItem("user"))._id,
        car: car._id,
        totalHours,
        calculatedTotalAmount:Math.floor(totalAmount),
        businessClass,
        bookedTimeSlots: {
          from,
          to,
        },
        name: passengerName, 
        mobileNo: mobileNumber ,

      };
  
      dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Col lg={10} sm={200} xs={200} className='p-10'>
          <img src={car.image} className="carimg bs1 h-100 w-100" data-aos='flip-left' data-aos-duration='15000'/>
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
           <h1> Flight Information </h1>
          </Divider>
          <div style={{ textAlign: "left" }}>
            <p><h5>{car.flightNumber}</h5></p>
            <p>{car.ticketPrice} Price /-</p>
            <p>Departure Airport: {car.departureAirport}</p>
            <p>Arrival Airport: {car.arrivalAirport}</p>
            <p>Arrival Time:{car.arrivalTime}</p>
            <p>Departure Time:{car.departureTime}</p>
          </div>

          <Divider type="horizontal" dashed>
           <h1> Select Time Slots</h1>
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booking Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                price : <b>{car.ticketPrice}</b>
              </p>

              <div>
             <div>
             Passenger Name: 
  <input
  
    type="text"
    placeholder="Passenger Name"
    value={passengerName}
    onChange={(e) => setPassengerName(e.target.value)}
  />
</div>


<div>
  Mobile Number
  <input
    type="text"
    placeholder="Mobile Number"
    value={mobileNumber}
    onChange={(e) => setMobileNumber(e.target.value)}
  />
</div>

    
    
    
  </div>
  <p>
      Number of Seats to Book:{" "}
      <input
        type="number"
        min="1"
        value={seatsToBook}
        onChange={handleSeatsChange}
      />
    </p>
              <Checkbox
                onChange={(e) => {
                  setBusinessClass(e.target.checked)
                }}
              >
                :BusinessClass
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
                //pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ
                billingAddress

              >
                  <button className="btn1">
                Book Now
              </button>
              </StripeCheckout>

              
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot,index) => {
                return(
                <button key={index} className="btn1 mt-2">
                {slot.from} - {slot.to}
                </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;

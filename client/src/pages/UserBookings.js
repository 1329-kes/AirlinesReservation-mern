import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings,deleteBooking } from "../redux/actions/bookingActions";
import { Col, Row,Button,Divider } from "antd";
import Spinner from '../components/Spinner';
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const {loading} = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  const handleDelete = (bookingId) => {
    dispatch(deleteBooking(bookingId));
  };

  return (
    <DefaultLayout>
        {loading && (<Spinner />)}
      <h3 className="text-center mt-2">My Bookings</h3>
    
      <Row justify="center" gutter={16}>
        <Col lg={10} sm={500}>
         
            {bookings.filter(o=>o.user==user._id).map((booking) => {
             return <Row gutter={80} className="bs1 mt-2 text-left">
                 
                <Col lg={11} sm={24}>
                    <p>Flight No: <b>{booking.car.flightNumber}</b></p>
                    
                    
                  <p>Name:<b> {booking.name}</b></p>
                  <p>Mobile Number:<b> {booking.mobileNo}</b></p>
                
              

                    <p>Date of Booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>

                    
                    <p>From: <b>{booking.car.arrivalAirport }</b></p>
                     <p>To: <b>{booking.car.departureAirport}</b></p>
                     <Divider type="horizontal" dashed>
            Other Information
          </Divider>
          

                     <p>Arrival Time:    <b>{booking.car.arrivalTime}</b></p>

                     <p>Departure Time:    <b>{booking.car.departureTime}</b></p>
                     
                    <p>Total amount Paid: <b>{booking.totalAmount}</b></p>
                    <p>Booking Status : <b>{booking.status}</b></p>
                    

                
                

                
                </Col>

                

                <Col lg={10} sm={20} className='text-right'>
                    <img style={{borderRadius:10}} src={booking.car.image}  height="250" width="320" className="p-2"/>
                    <Button 
                    type="primary" 
                    danger 
                    onClick={() => handleDelete(booking._id)}
                  >
                    Cancel Booking
                  </Button>

                    
                </Col>
              </Row>;
            })}
          
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;

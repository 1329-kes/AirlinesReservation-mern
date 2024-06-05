import axios from "axios";
import { message } from "antd";

export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    console.log("Sending booking request...", reqObj);
    await axios.post("/api/bookings/bookcar", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Your flight booked successfully");

    setTimeout(() => {
      window.location.href = '/userbookings';
    }, 500);

  } catch (error) {
    console.error("Booking Error:", error.response ? error.response.data : error.message);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong, please try again later");
  }
};

export const getAllBookings=()=>async dispatch=>{

  dispatch({type: 'LOADING' , payload:true})

  try {
      const response = await axios.get('/api/bookings/getallbookings')
      dispatch({type: 'GET_ALL_BOOKINGS', payload:response.data})
      dispatch({type: 'LOADING' , payload:false})
  } catch (error) {
      console.log(error)
      dispatch({type: 'LOADING' , payload:false})
  }
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  try {
    await axios.delete(`/api/bookings/${bookingId}`);
    message.success('Booking deleted successfully');
    dispatch(getAllBookings()); // Re-fetch all bookings after deletion
  } catch (error) {
    console.error(error);
    message.error('Failed to delete booking');
  }
};
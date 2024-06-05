import { Col, Row, Form, Input,DatePicker,Checkbox,Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addCar, editCar, getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
const{Option}=Select;




function EditCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState();
  const [totalcars, settotalcars] = useState([]);
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      settotalcars(cars);
      setcar(cars.find((o) => o._id == match.params.carid));
      console.log(car);
    }
  }, [cars]);

  function onFinish(values) {
    values._id = car._id;

    dispatch(editCar(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {car && (
            <Form
              initialValues={{
                ...car,
                departureTime: moment(car.departureTime),
                arrivalTime: moment(car.arrivalTime),
              }}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Flight</h3>
              <hr />
              <Form.Item
                name="flightNumber"
                label="Flight Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="departureAirport"
                label="Departure Airport"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image URL"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="arrivalAirport"
                label="Arrival Airport"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="departureTime"
                label="Departure Time"
                rules={[{ required: true }]}
              >
                <DatePicker showTime />
              </Form.Item>
              <Form.Item
                name="arrivalTime"
                label="Arrival Time"
                rules={[{ required: true }]}
              >
                <DatePicker showTime />
              </Form.Item>
              <Form.Item
                name="passengerCount"
                label="Passenger Count"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="ticketPrice"
                label="Ticket Price"
                rules={[{ required: true }]}
              >
                <Input prefix="$" suffix="USD" type="number" />
              </Form.Item>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="currency"
                label="Currency"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="GBP">GBP</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="flightClass"
                label="Class"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Economy">Economy</Option>
                  <Option value="Business">Business</Option>
                  <Option value="First">First</Option>
                </Select>
              </Form.Item>
              <div className="text-right">
                <button className="btn1" type="submit">Edit Flight</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;

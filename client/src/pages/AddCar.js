import { Col, Row, Form, Input, DatePicker, Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { addCar } from '../redux/actions/carsActions';

const { Option } = Select;

function AddCar() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.alertsReducer);

    function onFinish(values) {
        values.bookedTimeSlots = [];

        // Adjusting values to fit the schema
        values.departureTime = values.departureTime.format("YYYY-MM-DD HH:mm:ss");
        values.arrivalTime = values.arrivalTime.format("YYYY-MM-DD HH:mm:ss");

        dispatch(addCar(values));
        console.log('Submitted values:', values);
    }

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify='center' className='mt-5'>
                <Col lg={12} sm={24} xs={24} className='p-2'>
                    <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                        <h3>Add New Flight</h3>
                        <hr />
                        <Form.Item name='flightNumber' label='Flight Number' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='departureAirport' label='Departure Airport' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='arrivalAirport' label='Arrival Airport' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='departureTime' label='Departure Time' rules={[{ required: true }]}>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                        <Form.Item name='arrivalTime' label='Arrival Time' rules={[{ required: true }]}>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                        <Form.Item name='passengerCount' label='Passenger Count' rules={[{ required: true }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name='ticketPrice' label='Ticket Price' rules={[{ required: true }]}>
                            <Input type="number" prefix="$" suffix="USD" />
                        </Form.Item>
                        <Form.Item name='status' label='Status' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='currency' label='Currency' rules={[{ required: true }]}>
                            <Select defaultValue="USD">
                                <Option value="USD">USD</Option>
                                <Option value="EUR">EUR</Option>
                                <Option value="GBP">GBP</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name='flightClass' label='Class' rules={[{ required: true }]}>
                            <Select>
                                <Option value="Economy">Economy</Option>
                                <Option value="Business">Business</Option>
                                <Option value="First">First</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name='image' label='Image URL' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <div className='text-right'>
                            <button className='btn1' type='submit'>ADD FLIGHT</button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default AddCar;

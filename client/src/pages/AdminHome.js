import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";

const { RangePicker } = DatePicker;
function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addcar">ADD FLIGHT</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading == true && <Spinner />}

      <Row justify="left" gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={6} sm={30} xs={10}>
              <div className="car p-10 bs10">
                <img src={car.image} className="carimg" />

                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-1">
                    <p>{car.name}</p>
                    <p>FlightNumber:{car.flightNumber}</p>
                    <p>Arrival Time: {car.arrivalTime}</p>
                    <p>DepartureTime:{car.departureTime}</p>
                    <p> Price: {car.ticketPrice} /-</p>
                  </div>

                  <div className="mr-10">
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        className="mr-2"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this Flight?"
                      onConfirm={()=>{dispatch(deleteCar({carid : car._id}))}}
                      
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;

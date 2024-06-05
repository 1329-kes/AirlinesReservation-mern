import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row , Divider , DatePicker, Checkbox,Select} from 'antd'
import {Link} from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
const {RangePicker} = DatePicker;
const { Option } = Select;
function Home() {
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [FilteredCars , setFilteredcars] = useState([])
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {

        setFilteredcars(cars)
        
    }, [cars])


    function setFilter(values){

        var selectedFrom = moment(values[0]  )
        var selectedTo = moment(values[1] )

        const filtered = cars.filter(car => {
            const departureTime = moment(car.departureTime);
            
            const arrivalTime = moment(car.arrivalTime);
            const matchesAirports = (!departureAirport || car.departureAirport === departureAirport) &&
            
                                    (!arrivalAirport || car.arrivalAirport === arrivalAirport);
            return (
              selectedFrom.isSameOrBefore(departureTime) &&
              selectedTo.isSameOrAfter(arrivalTime)&&
              matchesAirports
            );
          });
        setFilteredcars(filtered)


    }
    const uniqueAirports = [...new Set(cars.flatMap(car => [car.departureAirport, car.arrivalAirport]))];

    return (
        <DefaultLayout>

             <Row className='mt-3' justify='center'>
                 
                 <Col lg={20} sm={24} className='d-flex justify-content-center'>

                     <RangePicker showTime={{format: 'HH:mm'}} format='YYYY-MM-DD HH:mm' onChange={setFilter}/>
                 
                 </Col>

             </Row>
             <Row className='mt-3' justify='center'>
                <Col lg={10} sm={24} className='d-flex justify-content-left'>
                    <Select
                        placeholder="Select Departure Airport"
                        onChange={value => setDepartureAirport(value)}
                        allowClear
                        style={{ width: '100%' }}
                    >
                        {uniqueAirports.map(airport => (
                            <Option key={airport} value={airport}>{airport}</Option>
                        ))}
                    </Select>
                </Col>
                <Divider/>
                <Col lg={10} sm={24} className='d-flex justify-content-left'>
                    <Select
                        placeholder="Select Arrival Airport"
                        onChange={value => setArrivalAirport(value)}
                        allowClear
                        style={{ width: '100%' }}
                    >
                        {uniqueAirports.map(airport => (
                            <Option key={airport} value={airport}>{airport}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>

              {loading == true && (<Spinner/>)}


              
              <Row justify='left' gutter={16}>

                   {FilteredCars.map(car=>{
                       return <Col lg={6} sm={23} xs={10}>
                            <div className="car p-10 bs2">
                               <img src={car.image} className="carimg" />

                               <div className="car-content d-flex align-items-left justify-content-between">
                               <div className="text-left pl-10">

                               <p>Flight Number: {car.flightNumber}</p>
                  <p>Departure Airport: {car.departureAirport}</p>
                  <p>Arrival Airport: {car.arrivalAirport}</p>
                  <p>
                    Departure Time: {moment(car.departureTime).format('LLL')}
                  </p>
                  <p>Arrival Time: {moment(car.arrivalTime).format('LLL')}</p>
                  <p>Ticket Price: ${car.ticketPrice}</p>

                                    <div>
                                        <button className="btn1 mr-2"><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                                    </div>

                               </div>
                            </div>
                            </div>
                       </Col>
                   })}

              </Row>

        </DefaultLayout>
    )
}

export default Home

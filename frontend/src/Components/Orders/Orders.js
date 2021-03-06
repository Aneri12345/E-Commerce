import React, { Component, useState } from 'react';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import { Card, CardHeader, CardBody, Button, CardFooter } from 'reactstrap';
import axios from 'axios';
import OrderWithId from './OrderWithId';
import { Redirect } from 'react-router';

// FUNCTIONAL COMPONENT
function OrderList({ result }) {
    const [redirectVar, changeRedirectVar] = useState(false);
    const [id, saveId] = useState(0);

    function getOrder(id) {
        saveId(id);
        changeRedirectVar(true);
    }

    let renderOrder = result.map((ol) => {
        return (
            <div style={{ maxHeight: '35vh' }} className="mt-3 d-flex justify-content-center">
                <div style={{ maxHeight: '35vh' }} className="mt-3 d-flex justify-content-center">
                    <Card className="col-md-8">
                        <CardHeader className="row">
                            <div className="col">
                                <p className="row">ORDER PLACED: {ol.orderId}</p>
                                <p className="row"> {ol.dateTime}</p>
                            </div>
                            <div className="col">
                                <p className="row">TOTAL</p>
                                <p className="row"> Rs {ol.totalPrice}</p>
                            </div>
                            <div className="col">
                                <p className="row">SHIP TO</p>
                                <p className="row">{ol.name}</p>
                            </div>
                        </CardHeader>
                        <CardBody>
                            SOME DESCRIPTION
                </CardBody>
                        <CardFooter className='row'>
                            <Button color="primary" className="mx-auto stretched-link" onClick={getOrder(3)}>View Details</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    });
    if (redirectVar) {
        return (
            <OrderWithId orderId={id} />
        )
    }
    return (renderOrder);
}

// CLASS COMPONENT
class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: '',
            result: [],
            redirectVar: false,
        }
        this.newOrder = this.newOrder.bind(this);
    }

    // NEW ORDER REDIRECT
    newOrder() {
        this.setState({ redirectVar: true });
    }

    // FETCH FROM DB AS PAGE LOADS
    componentDidMount() {
        axios.get('http://localhost:5000/orderList')
            .then((response) => {
                if (response.data.status === 1) {
                    this.setState({
                        result: response.data.data,
                    });
                }
                
                this.setState({
                    msg: response.data.msg,
                });
            })
            .catch((err) => {
                this.setState({
                    msg: err,
                });
            });
    }

    // RENDER METHOD
    render() {
        if (this.state.redirectVar) {
            return (<Redirect to='/place-order' />)
        }
        return (
            <div>
                <Header />
                <div className="row">
                    <div style={{ minHeight: "93vh" }}>
                        <Sidebar />
                    </div>
                    <div style={{ minWidth: '75%' }}>
                        <div className="mt-3 d-flex justify-content-center">
                            Showing Orders of:<br />
                            <div className="ml-2">
                                <select name="year" id="year" onBlur={this.handleInputChange}>
                                    <option value="allYear">All Years</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                </select>
                                <span role="button" className="ml-2 text-decoration-none">Go</span>
                            </div>

                        </div>
                        <div className="d-flex justify-content-center">
                            <Button color="primary btn-sm mt-4" onClick={this.newOrder}>Place a new Order</Button>
                        </div>
                        <OrderList result={this.state.result} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Orders;

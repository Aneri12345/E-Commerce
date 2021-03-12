import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

class Products extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div style={{ height: "93vh" }}>
                        <Sidebar />
                    </div>
                    <p>INSIDE</p>
                </div>
            </div>
        );
    }
}

export default Products;
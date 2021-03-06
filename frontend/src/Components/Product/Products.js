import React, { Component, useState } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'reactstrap';
import Sidebar from '../Common/Sidebar';
import Header from '../Common/Header';
import axios from 'axios';


// RENDER PRODUCT LIST FUNCTIONAL COMPONENT
class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectVar: false,
            pid: '',
        }
    }

    render() {
        if (this.state.redirectVar) {
            return (
                <Redirect to={`/edit-product/${this.state.pid}`} />
            )
        }

        let renderList = this.props.result.map((pl) => {
            return (
                <tr>
                    <div className="d-flex justify-content-center"><span id={pl.productId} className="fa fa-trash" onClick={() => { axios.get('http://localhost:5000/deleteProduct', { headers: { productId: pl.productId } }) }} role="button" /></div>
                    <td><div className="d-flex justify-content-center">{pl.productName}</div></td>
                    <td><div className="d-flex justify-content-center">{pl.categoryName}</div></td>
                    <td><div className="d-flex justify-content-center">{pl.subCategoryName}</div></td>
                    <td><div className="d-flex justify-content-center">{pl.brandName}</div></td>
                    <td><div className="d-flex justify-content-center">{pl.price}</div></td>
                    <td><div className="d-flex justify-content-center">{pl.quantity}</div></td>
                    <td><div className="d-flex justify-content-center"><span id={pl.productId} className="fa fa-pencil" onClick={() => { this.setState({ pid: pl.productId, redirectVar: true }) }} role="button" /></div></td>
                </tr>
            );
        })

        return (renderList);
    }

}

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: [],
            msg: '',
            brandFilter: false,
            categoryFilter: false,
            subCategoryFilter: false,
        }

        this.filterBrands = this.filterBrands.bind(this);
        this.filterCategory = this.filterCategory.bind(this);
        this.filterSubCategory = this.filterSubCategory.bind(this);
    }

    filterBrands() {
        this.setState({
            brandFilter: true,
        });
    }

    filterCategory() {
        this.setState({
            categoryFilter: true,
        });
    }

    filterSubCategory() {
        this.setState({
            subCategoryFilter: true,
        });
    }

    // FETCH RECORD AS SOON AS PAGE LOADS
    componentDidMount() {
        axios.get('http://localhost:5000/productList')
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
        if (this.state.brandFilter) {
            return (
                <Redirect to="/product-list/filter-brand" />
            );
        }

        else if (this.state.categoryFilter) {
            return (
                <Redirect to="/product-list/filter-category" />
            );
        }

        else if (this.state.subCategoryFilter) {
            return (
                <Redirect to="/product-list/filter-subCategory" />
            );
        }

        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-4.5" style={{ minHeight: "93vh" }}>
                        <Sidebar />
                    </div>
                    <div style={{ width: "82vw" }}>
                        <div className="mt-2 d-flex">
                            <Button className="mx-auto" color="primary" onClick={this.filterBrands}>
                                Filter By Brands
                            </Button>
                            <Button className="mx-auto" color="primary" onClick={this.filterCategory}>
                                Filter By Category
                            </Button>
                            <Button className="mx-auto" color="primary" onClick={this.filterSubCategory}>
                                Filter By Sub Category
                            </Button>
                        </div>
                        <div className="m-5">
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <th><div className="d-flex justify-content-center">Delete</div></th>
                                    <th><div className="d-flex justify-content-center">Product Name</div></th>
                                    <th><div className="d-flex justify-content-center">Category Name</div></th>
                                    <th><div className="d-flex justify-content-center">Sub-Category Name</div></th>
                                    <th><div className="d-flex justify-content-center">Brand Name</div></th>
                                    <th><div className="d-flex justify-content-center">Price</div></th>
                                    <th><div className="d-flex justify-content-center">Quantity</div></th>
                                    <th><div className="d-flex justify-content-center">Edit</div></th>
                                </tr>
                                <ProductList result={this.state.result} />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Products;

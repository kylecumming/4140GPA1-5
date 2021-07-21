import React, { Component } from "react";
import '../PODetails/PODetails.css';
import Navbar from "../Navbar/Navbar"
import Axios from 'axios';

export default class PODetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            poNo: 0,
            po: [],
            poLines: []
        };
    }

    getPOInfomation17() {
        Axios.get(`http://localhost:3000/api/company/getPODetail371/${this.state.poNo}`).then((response) => {
            this.setState({ po: response.data });
        }).catch((err) => {
            alert(err);
        });

        Axios.get(`http://localhost:3000/api/company/getPOLines371/${this.state.poNo}`).then((response) => {
            this.setState({ poLines: response.data });
        }).catch((err) => {
            alert(err);
        });
    }

    componentDidMount() {
        const search = this.props.location.search; // returns the URL query String
        const params = new URLSearchParams(search);
        this.setState({
            poNo: params.get('id'),
        }, () => { this.getPOInfomation17() });
    }


    render() {
        return (
            <div>
                <Navbar />
                <div style={{ margin: '10px' }}>
                    <button onClick={() => this.props.history.goBack()}>Back</button>
                    <h3 >Part Order number {this.state.poNo} details:</h3>
                    <div> Status: {this.state.po.status17} </div>
                    <div> Date: {this.state.po.datePO17} </div>
                    <div> Total Cost: {this.state.poLines.reduce(
                        (a, b) => a + b.linePrice17, 0)} </div>
                    <div> Number of parts: {this.state.poLines.reduce(
                        (a, b) => a + b.order_qty371, 0)}  </div>
                </div>
                <div style={{
                    'marginLeft': '10px',
                    'marginRight': '10px'
                }}>
                    <table id="POsList">
                        <thead>
                            <tr>
                                <th>Line No</th>
                                <th>Part No</th>
                                <th>Line Price</th>
                                <th>Order_QTY</th>
                                <th>Available</th>
                                <th>current Part Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.poLines.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.lineNo17}</td>
                                    <td>{element.partNo17}</td>
                                    <td>{element.linePrice17}</td>
                                    <td>{element.order_qty371}</td>
                                    <td>{element.avail_qty371}</td>
                                    <td>{element.currentPrice17}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            </div >
        );
    }
}

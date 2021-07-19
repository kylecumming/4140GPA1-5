import React, { Component } from "react";
import Axios from 'axios';
import '../HomePOsList/HomePOsList.css';
import Navbar from "../Navbar/Navbar"

export default class HomePOsList extends Component {

    constructor() {
        super();
        this.state = {
            orders: [], clientId: 1
        };
        this.getPOsList17 = this.getPOsList17.bind(this);
        // this.getPODetails17 = this.getPODetails17.bind(this);
    }

    async getPOsList17() {
        Axios.get(`http://localhost:3000/api/client/getPOList17/${this.state.clientId}`).then((response) => {
            this.setState({ orders: response.data });
        }).catch((err) => {
            alert(err);
        });
    }

    componentDidMount() {
        this.getPOsList17()
    }

    getPODetails17(PO) {
        console.log(PO);
    }

    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <div style={{
                        'margin-left': '10px',
                        'margin-right': '10px'
                    }}>
                        <table id="POsList">
                            <thead>
                                <tr>
                                    <th>PO ID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.map((element, index) => (
                                    <tr key={index} onClick={this.getPODetails17.bind(this, element)}>
                                        <td>{element.poNo17}</td>
                                        <td>{element.datePO17}</td>
                                        <td>{element.status17}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div >
                </div >
            </div >
        );
    }
}


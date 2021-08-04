import React, { Component } from "react";
import Axios from 'axios';
import '../HomePOsList/HomePOsList.css';
import Navbar from "../Navbar/Navbar"
import createHistory from 'history/createBrowserHistory'

export default class HomePOsList extends Component {

    constructor() {
        super();
        this.state = {
            orders: []
        };
        this.getPOsList17 = this.getPOsList17.bind(this);
    }

    async getPOsList17() {
        Axios.get(`http://localhost:3000/api/company/z/getPOList17`).then((response) => {
            this.setState({ orders: response.data });
        }).catch((err) => {
            alert(err);
        });
    }



    componentDidMount() {
        this.getPOsList17()
    }

    getPODetails17(PO) {
        this.props.history.push({ pathname: '/PODetails', state: { poNo: PO.poNo17 } });
    }

    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <div style={{
                        'marginLeft': '10px',
                        'marginRight': '10px'
                    }}>
                        <table className="list">
                            <thead>
                                <tr>
                                    <th>PO No</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Money Owed</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.map((element, index) => (
                                    <tr key={index} onClick={this.getPODetails17.bind(this, element)}>
                                        <td>{element.poNo17}</td>
                                        <td>{element.datePO17}</td>
                                        <td>{element.clientCity17}</td>
                                        <td>{element.moneyOwed17}</td>
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


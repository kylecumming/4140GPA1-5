import React, { Component } from "react";
import Axios from 'axios';
import Navbar from "../Navbar/Navbar"

export default class PartsList extends Component {

    constructor() {
        super();
        this.state = {
            parts: []
        };
        this.getPartsList17 = this.getPartsList17.bind(this);
    }

    async getPartsList17() {
        Axios.get(`http://localhost:3000/api/company/getPartsList17`).then((response) => {
            this.setState({ parts: response.data });
        }).catch((err) => {
            alert(err);
        });
    }

    componentDidMount() {
        this.getPartsList17()
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
                                    <th>Part No</th>
                                    <th>Part Name</th>
                                    <th>Part Description</th>
                                    <th>Current Price</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.parts.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.partNo17}</td>
                                        <td>{element.partName17}</td>
                                        <td>{element.partDescription17}</td>
                                        <td>{element.currentPrice17}</td>
                                        <td>{element.qty17}</td>
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


import React, { Component } from "react";
import Axios from 'axios';
import Navbar from "../Navbar/Navbar"

export default class PartsList extends Component {

    constructor() {
        super();
        this.state = {
            companies: []
        };
        this.getPartsList17 = this.getPartsList17.bind(this);
    }

    async getPartsList17() {
        Axios.get(`http://localhost:4003/api/company/z/getAllClientList17`).then((response) => {
            this.setState({ companies: response.data });
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
                                    <th>Company ID</th>
                                    <th>Company Name</th>
                                    <th>City</th>
                                    <th>Money Owed</th>
                                    <th>Client Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.companies.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.clientCompId17}</td>
                                        <td>{element.clientCompName17}</td>
                                        <td>{element.clientCity17}</td>
                                        <td>{element.moneyOwed17}</td>
                                        <td>{element.TableName}</td>
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


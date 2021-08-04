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
        Axios.get(`http://localhost:3000/api/client/y/getPOs17/${this.state.poNo}`).then((response) => {
            this.setState({ po: response.data });
        }).catch((err) => {
            alert(err);
        });

        Axios.get(`http://localhost:3000/api/client/y/getPOLines17/${this.state.poNo}`).then((response) => {
            this.setState({ poLines: response.data });
        }).catch((err) => {
            alert(err);
        });
    }

    componentDidMount() {
        this.setState({
            poNo: this.props.location.state.poNo,
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
                        (a, b) => a + b.qty17, 0)}  </div>
                </div>
                <div style={{
                    'marginLeft': '10px',
                    'marginRight': '10px'
                }}>
                    <table className="list">
                        <thead>
                            <tr>
                                <th>Line No</th>
                                <th>Part No</th>
                                <th>Line Price</th>
                                <th>QTY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.poLines.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.lineNo17}</td>
                                    <td>{element.partNo17}</td>
                                    <td>{element.linePrice17}</td>
                                    <td>{element.qty17}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            </div >
        );
    }
}

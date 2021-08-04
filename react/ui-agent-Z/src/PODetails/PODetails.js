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
            poLines: [],
            transaction: null
        };

        this.commitTransaction = this.commitTransaction.bind(this);
        this.rollbackTransaction = this.rollbackTransaction.bind(this);
    }

    getPOInfomation17() {
        let POdetails = `http://localhost:4003/api/company/z/getPODetail371/${this.state.poNo}`;
        let POLines = `http://localhost:4003/api/company/z/getPOLines371/${this.state.poNo}`;
        const detailsRequest = Axios.get(POdetails)
        const linesRequest = Axios.get(POLines)

        Axios.all([detailsRequest, linesRequest]).then(Axios.spread((...responses) => {
            const detailsResponse = responses[0].data
            const linesResponseTwo = responses[1].data
            this.setState({
                po: detailsResponse,
                poLines: linesResponseTwo
            });

            if (this.state.po.status17 === 'Pending' || this.state.po.status17 === 'Placed') {
                this.setState({
                    transaction: 'able_to_fill'
                });
            }
        })).catch(err => {
            alert(err);
        })



    }

    startTransaction371() {
        console.log("transaction started")
        Axios.get(`http://localhost:4003/api/company/z/startTransaction371/${this.state.poNo}`).then((response) => {
            this.setState({ transaction: response.data });
        }).catch((err) => {
            alert(err);
        });
    }

    componentDidMount() {
        this.setState({
            poNo: this.props.location.state.poNo,
        }, () => { this.getPOInfomation17() })
    }

    commitTransaction() {
        Axios.get('http://localhost:4003/api/company/z/endTransaction371/commit').then((res) => {
            this.setState({
                transaction: 'commit_success'
            });
        }).catch((err) => {
            this.setState({
                transaction: 'rollback_success',
            })
        })
    }

    rollbackTransaction() {
        Axios.get('http://localhost:4003/api/company/z/endTransaction371/rollback').then((res) => {
            this.setState({
                transaction: 'rollback_success',
            })
        }).catch((err) => {
            this.setState({
                transaction: 'rollback_failed',
            })
        })
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
                    <div> Client ID: {this.state.po.clientCompId17} </div>
                    <div> Client Location: {this.state.po.clientCity17} </div>
                    <div> Total Cost: {this.state.poLines.reduce(
                        (a, b) => a + b.linePrice17, 0)} </div>
                    <div> Number of parts: {this.state.poLines.reduce(
                        (a, b) => a + b.order_qty371, 0)}  </div>
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
                <div style={{ margin: '10px' }}>
                    {this.state.transaction === 'able_to_fill' &&
                        <button onClick={() => this.startTransaction371()}>Fill order</button>
                    }
                    {this.state.transaction === 'unfillable' &&
                        <h5 className='errorMsg'>This PO is unfillable</h5>
                    }
                    {this.state.transaction === 'checking' &&
                        <div>
                            <button onClick={() => this.commitTransaction()}>Commit</button>
                            <button onClick={() => this.rollbackTransaction()}>Cancel</button>
                        </div>
                    }
                    {this.state.transaction === 'commit_success' &&
                        <h5 className="successMsg">Commit Success!</h5>
                    }
                    {this.state.transaction === 'rollback_success' &&
                        <h5 className="successMsg">Rollback Success!</h5>
                    }
                    {this.state.transaction === 'commit_failed' &&
                        <h5 className='errorMsg'>Commit Failed!</h5>
                    }
                    {this.state.transaction === 'rollback_failed' &&
                        <h5 className='errorMsg'>Rollback Failed!</h5>
                    }
                </div>
            </div >
        );

    }
}

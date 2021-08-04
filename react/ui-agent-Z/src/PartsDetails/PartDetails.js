import React, { Component } from "react";
import Axios from 'axios';
import Navbar from "../Navbar/Navbar"

export default class PartDetails extends Component {

    constructor() {
        super();
        this.state = {
            partNo: 0,
            part: [],
            updateMsg: null,
            updateError: null,
        };

        this.submit = this.submit.bind(this);

    }

    getPartInfomation17() {
        Axios.get(`http://localhost:3000/api/company/z/getPart17/${this.state.partNo}`).then((response) => {
            this.setState({ part: response.data });
        }).catch((err) => {
            alert(err);
        });
    }


    submit(event) {
        event.preventDefault();
        Axios.put('http://localhost:3000/api/company/z/updateparts17', {
            'partNo17': this.state.part.partNo17,
            'currentPrice17': this.state.part.currentPrice17,
            'qty17': this.state.part.qty17,

        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    updateMsg: "Update Success",
                    updateError: null
                });
            } else {
                console.log(response.status)
            }
        }).catch((err) => {
            this.setState({
                updateError: err.response.data,
                updateMsg: null
            });
        });

    }

    componentDidMount() {
        this.setState({
            partNo: this.props.location.state.partNo,
        }, () => { this.getPartInfomation17() })
    }


    render() {
        return (
            <div>
                <Navbar />
                <div style={{ margin: '10px' }}>
                    <button onClick={() => this.props.history.goBack()}>Back</button>
                    <form onSubmit={this.submit} style={{ margin: '10px' }}>
                        <h3 >Part Number {this.state.part.partNo17} details:</h3>

                        <div> Part Name: {this.state.part.partName17} </div>

                        <div> Part Description: {this.state.part.partDescription17} </div>
                        <div>
                            <span> Current Price: </span>
                            <input
                                id="input-box-first"
                                placeholder="Part Number"
                                value={this.state.part.currentPrice17}
                                onChange={(e) => {
                                    var part = { ...this.state.part }
                                    part.currentPrice17 = e.target.value
                                    this.setState({ part })
                                }}
                                required
                            />
                        </div>
                        <div>
                            <span> QTY: </span>
                            <input
                                id="input-box-first"
                                placeholder="Part Number"
                                value={this.state.part.qty17}
                                onChange={(e) => {
                                    var part = { ...this.state.part }
                                    part.qty17 = e.target.value
                                    this.setState({ part })
                                }}
                                required
                            />
                        </div>

                        <button type="submit" >Update</button>
                    </form>
                    {this.state.updateMsg !== null && <h5 className='successMsg' style={{ margin: '10px' }}> {this.state.updateMsg} </h5>}
                    {this.state.updateError !== null && <h5 className='errorMsg' style={{ margin: '10px' }}> {this.state.updateError} </h5>}
                </div >
            </div >
        );
    }
}

import React, { Component } from "react";
import Axios from 'axios';
import '../CreatePO/CreatePO.css';
import Navbar from "../Navbar/Navbar"

export default class CreatePO extends Component {

    constructor() {
        super();
        this.state = {
            PONo: '',
            CompanyID: 1,
            quantity: '',
            password: 1
        };

        this.submit = this.submit.bind(this);
    }

    submit(event) {
        
        event.preventDefault();
        Axios.post('http://localhost:3000/api/client/postNewOrder17', {
            'clientCompId17': this.state.companyID,
            'partNo17': this.state.PONo,
            'qty17': this.state.quantity,
            'clientCompPassword17': this.state.password
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = "/home";
            } else {
                alert(response.status);
            }
        }).catch(function (error) {
            alert(error);
        });
    }


    render() {
        return (
            <div>
                <Navbar />

                <form onSubmit={this.submit}>
                    <label htmlFor="input-box-first" style={{ margin: '10px' }}>
                        <span className="visually-hidden">Enter a PO</span>
                    </label>
                    <input
                        id="input-box-first"
                        placeholder="PO Number"
                        onChange={(e) => this.setState({ PONo: e.target.value })}
                        required
                    />
                    <input
                        id="input-box"
                        placeholder="quantity"
                        onChange={(e) => this.setState({ quantity: e.target.value })}
                        required
                    />
                    <button type="submit" >Create</button>
                </form>
            </div >
        );
    }
}

import React, { Component } from "react";
import Axios from 'axios';
import '../CreatePO/CreatePO.css';
import Navbar from "../Navbar/Navbar"
import Cookies from 'js-cookie';
import cookieParser from "cookie-parser";
/*Used code from https://www.codegrepper.com/code-examples/javascript/get+browser+cookies+javascript
for getCookie Function
*/
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export default class CreatePO extends Component {

    
    
    constructor() {
        super();
        this.state = {
            PONo: '',
            CompanyID: getCookie("userid"),
            quantity: '',
            password: '12345',
            createError: null,
        };

        this.submit = this.submit.bind(this);

    }

    submit(event) {
        event.preventDefault();
        Axios.post('http://localhost:3000/api/client/postNewOrder17', {
            'clientCompId17': parseInt(this.state.CompanyID),
            'partNo17': parseInt(this.state.PONo),
            'qty17': parseInt(this.state.quantity),
            'clientCompPassword17': this.state.password

        }).then((response) => {
            if (response.status === 200) {
                this.props.history.push({ pathname: '/home' });
            } else {
                console.log(response.status)
            }
        }).catch((err) => {
            this.setState({ createError: err.response.data });
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
                        placeholder="Part Number"
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
                {this.state.createError !== null && <h5 style={{ margin: '10px', color: 'red' }}> {this.state.createError} </h5>}
            </div >
        );
    }
}

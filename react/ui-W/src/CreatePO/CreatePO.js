import React, { Component } from "react";
import Axios from 'axios';
import '../CreatePO/CreatePO.css';
import Navbar from "../Navbar/Navbar"
import addIcon from "./images/add.png"
/*Used code from https://www.codegrepper.com/code-examples/javascript/get+browser+cookies+javascript
for getCookie Function
*/

/* Used add to cat icon from https://icons8.jp/icons/set/add */

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export default class CreatePO extends Component {

    constructor() {
        super();
        this.state = {
            partNo: '',
            CompanyID: getCookie("userid"),
            quantity: '',
            password: 'password',
            createError: null,
            poLines: [],
            controlId: 1,
        };

        this.submit = this.submit.bind(this);

    }

    submit(event) {
        event.preventDefault();
        Axios.post('http://localhost:3000/api/client/w/postNewOrder17', {
            'clientCompId17': parseInt(this.state.CompanyID),
            'poLines371': this.state.poLines,
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

    addPOLine = event => {
        const newPOLine = { id: this.state.controlId, partNo: this.state.partNo, qty: this.state.quantity };
        const nextId = this.state.controlId + 1;
        const poLines = this.state.poLines;
        Axios.get(`http://localhost:3000/api/client/w/getPart/${this.state.partNo}`)
            .then(() => {
                poLines.push(newPOLine);
                this.setState({ poLines });
                this.setState({ controlId: nextId });
                this.setState({ createError: null });
            }).catch((err) => {
                this.setState({ createError: err.response.data });
            });
    }

    render() {
        return (
            <div >
                <Navbar />
                <form onSubmit={this.submit} >
                    <label htmlFor="input-box-first"
                        style={
                            { margin: '10px' }
                        } >
                        <span className="visually-hidden" > Enter a PO </span>  </label> <
                        input id="input-box-first"
                        placeholder="Part Number"
                        onChange={
                            (e) => this.setState({ partNo: e.target.value })
                        }
                        required />
                    < input id="input-box"
                        placeholder="quantity"
                        onChange={
                            (e) => this.setState({ quantity: e.target.value })
                        }
                        required />
                    <a href="#"
                        onClick={this.addPOLine} > < img id="add-icon"
                            alt="add-image"
                            src={addIcon}
                        /></a > {
                        this.state.poLines.length >= 1 && < dl style={
                            { margin: '10px', color: 'black' }
                        } > {
                                this.state.poLines.map((poLine, i) => {
                                    if (i >= 0) {
                                        return (< React.Fragment key={poLine.id} >
                                            <dt > {"Line " + parseInt(i + 1)} </dt>
                                            <dd > {"PartNo: " + poLine.partNo + " Quantity: " + poLine.qty} </dd> </React.Fragment >);
                                    }
                                    return;
                                })
                            } </dl>} < br />

                    < button id="submit" disabled={!this.state.poLines.length}
                        type="submit" > Create </button>
                </form > {
                    this.state.createError !== null && < h5 style={
                        { margin: '10px', color: 'red' }
                    } > {this.state.createError} </h5>
                }
            </div>
        );
    }
}
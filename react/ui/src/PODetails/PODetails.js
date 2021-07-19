import React, { Component } from "react";
import '../PODetails/PODetails.css';
import Navbar from "../Navbar/Navbar"


export default class PODetails extends Component {

    constructor() {
        super();
        this.state = {
            PO: ''
        };
    }

    render() {
        return (
            <div>
                <Navbar />

            </div >
        );
    }
}


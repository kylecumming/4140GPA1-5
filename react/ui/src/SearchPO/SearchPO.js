import React, { Component } from "react";
import Axios from 'axios';
import '../SearchPO/SearchPO.css';
import Navbar from "../Navbar/Navbar"

export default class SearchPO extends Component {

    constructor() {
        super();
        this.state = {
            searchPONo: '',
            PO: {},
            poFound: null,
        };

        this.submit = this.submit.bind(this);
    }

    submit(event) {
        event.preventDefault();
        Axios.get(`http://localhost:3000/api/client/getPOs17/${this.state.searchPONo}`).then((response) => {
            this.setState({
                PO: response.data,
                poFound: true,
            });
        }).catch((err) => {
            this.setState({
                poFound: false,
            });
        });

    }


    render() {
        return (
            <div>
                <Navbar />

                <form onSubmit={this.submit}>
                    <label htmlFor="header-search" style={{ margin: '10px' }}>
                        <span className="visually-hidden">Search by poNo</span>
                    </label>
                    <input
                        id="header-search"
                        placeholder="Search POs"
                        onChange={(e) => this.setState({ searchPONo: e.target.value })}
                    />
                    <button type="submit" >Search</button>
                </form>
                {this.state.poFound === false && <h5 style={{ color: 'red' }}> Error the PO was not found </h5>}
            </div >
        );
    }
}

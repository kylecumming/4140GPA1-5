import React, { Component } from "react";
import Axios from 'axios';
import '../SearchPO/SearchPO.css';
import Navbar from "../Navbar/Navbar"

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


export default class SearchPO extends Component {

    constructor() {
        super();
        this.state = {
            searchPONo: '',
            PO: {},
            poFound: null,
            companyId: getCookie("userid") // defaulted for now - will need to be current company 
        };

        this.submit = this.submit.bind(this);
    }

    submit(event) {
        event.preventDefault();

        Axios.get(`http://localhost:3000/api/client/w/getPOs17/${this.state.searchPONo}/${this.state.companyId}`).then((response) => {
            this.setState({
                PO: response.data,
                poFound: true,
            });
            this.props.history.push({ pathname: '/PODetails', state: { poNo: this.state.PO.poNo17 } });
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

                <div style={{ margin: '10px' }}>
                    <form onSubmit={this.submit}>
                        <label htmlFor="header-search" style={{ marginRight: '10px' }}>
                            <span className="visually-hidden">Search by poNo</span>
                        </label>
                        <input
                            id="header-search"
                            placeholder="Search POs"
                            onChange={(e) => this.setState({ searchPONo: e.target.value })}
                        />
                        <button type="submit" className="search-button" >Search</button>
                    </form>
                    {this.state.poFound === false && <h5 className="errorMsg"> Error the PO was not found </h5>}
                </div >
            </div>
        );
    }
}

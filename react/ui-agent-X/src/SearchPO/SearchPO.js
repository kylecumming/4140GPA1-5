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

        Axios.get(`http://localhost:4001/api/company/x/getPOs17/${this.state.searchPONo}`).then((response) => {
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
                    {this.state.poFound === false && <h5 className='errorMsg'> Error the PO was not found </h5>}
                </div >
            </div>
        );
    }
}

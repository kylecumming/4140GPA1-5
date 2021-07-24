import React, { Component } from "react";
import Axios from 'axios';
import '../HomePOsList/HomePOsList.css';
import Navbar from "../Navbar/Navbar"
import Cookies from "js-cookie"
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

export default class HomePOsList extends Component {

    constructor() {
        super();
        this.state = {
            orders: [], clientId: getCookie("userid") // needs a value from login
        };
        this.getPOsList17 = this.getPOsList17.bind(this);
    }

    async getPOsList17() {
        Axios.get(`http://localhost:3000/api/client/getPOList17/${this.state.clientId}`).then((response) => {
            this.setState({ orders: response.data });
        }).catch((err) => {
            alert(err);
        });
    }

    componentDidMount() {
        this.getPOsList17()
    }

    getPODetails17(PO) {
        this.props.history.push({ pathname: '/PODetails', state: { poNo: PO.poNo17 } });
    }

    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <div style={{
                        'marginLeft': '10px',
                        'marginRight': '10px'
                    }}>
                        <table className="list">
                            <thead>
                                <tr>
                                    <th>PO No</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.map((element, index) => (
                                    <tr key={index} onClick={this.getPODetails17.bind(this, element)}>
                                        <td>{element.poNo17}</td>
                                        <td>{element.datePO17}</td>
                                        <td>{element.status17}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div >
                </div >
            </div >
        );
    }
}


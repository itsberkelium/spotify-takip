import React, { Component } from "react";
import moment from "moment";
import "moment/locale/tr";
import payees from "./payees";

import "./App.scss";

export default class App extends Component {
  month = moment().month();
  monthName = moment().format("MMMM");
  nextMonthName = moment().add(1, "M").format("MMMM");

  state = {
    paysThisMonth: {},
    paysNextMonth: {},
  };

  componentDidMount = () => {
    moment.locale("tr");

    payees.some((data, index) => {
      if (data.payMonths.includes(this.month)) {
        this.setState({ paysThisMonth: data }, () => {
          this.setState({ paysNextMonth: payees[index + 1] });
        });
        return true;
      }

      return false;
    });
  };

  render() {
    return (
      <div className="App">
        <h1>
          {this.monthName} ayı Spotify ödeme sırası:{" "}
          <span>{this.state.paysThisMonth.name}</span>
        </h1>
        <h2>
          Gelecek ay ({this.nextMonthName}):{" "}
          <span>{this.state.paysNextMonth.name}</span>
        </h2>
      </div>
    );
  }
}

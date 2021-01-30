import React, { Component } from 'react';
import moment from 'moment';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      day: -1
    }
    this.increaseDate = this.increaseDate.bind(this);
    this.decreaseDate = this.decreaseDate.bind(this);
    this.setDate = this.setDate.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  componentDidMount() {
    let newDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    this.setState({
      date: newDate
    })
  }

  setDate() {
    let newDate = moment(new Date()).add(this.state.day, 'days').format('YYYY-MM-DD');
    this.setState({date: newDate});
    this.props.onDateChange(this.state.date);
  }

  async increaseDate() {
    await this.setState({day: this.state.day + 1})
    this.setDate();
  }

  async decreaseDate() {
    await this.setState({day: this.state.day - 1})
    this.setDate();
  }

  getTitle() {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const tomorrow = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');
    const yesterday = moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD');
    const currentDate = this.state.date;
    if(today === currentDate) {
      return "Tonight";
    }
    else if(tomorrow === currentDate) {
      return "Tomorrow";
    }
    else if(yesterday === currentDate) {
      return "Last night";
    }
    else {
      return moment(currentDate).format('MMM Do');
    }
  }

  render() {
    console.log("Header: render()");
    const title = this.getTitle();
    return (
      <div className="row header">
        <div className="col-xs-1"><span className="glyphicon glyphicon-chevron-left" onClick={this.decreaseDate}></span></div>
        <div className="col-xs-9 col-sm-10"><h2 className="text-center">{title}</h2></div>
        <div className="col-xs-1"><span className="glyphicon glyphicon-chevron-right pull-right" onClick={this.increaseDate}></span></div>
      </div>
    )
  }
}

export default Header;

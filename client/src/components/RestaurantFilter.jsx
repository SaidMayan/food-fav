import React, { Component } from 'react';
import './RestaurantFilter.css';

export default class RestaurantFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
      term: this.refs.term.value,
      location: this.refs.location.value
    });
  }

  handleInput() {
      this.props.term = this.refs.term.value,
      this.props.location = this.refs.location.value
    console.log(this.props.term);
  }

  render() {
  return (
    <div>

    <form onSubmit={this.handleSubmit} className='filter'>
      <input type='text' ref='term'  name='term' placeholder="Search term" />
      <input type='text' ref='location'  name="location" placeholder="Location" />
      <input class="ressubmit" type="submit" value="Submit" onClick="" />
    </form>
    </div>
    )
}
}

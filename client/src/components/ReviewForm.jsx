import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:false,
      redirectHome: false,
      review: Object.assign({

       rest_name:'',
       content: '',
       rating:'',
       user_id:'1',
       rest_id:'1'

     }, props.initialValue)
   };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
  }

  handleInputChange(e) {
    // see https://reactjs.org/docs/forms.html#handling-multiple-inputs
    const {name, value} = e.target;
    console.log(name, value);
    this.setState((prevState, props) => ({
      review: {
        ...prevState.review,
        [name]: value
      }
    }))
  }

  handleSubmitReview(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.review);
    this.setState({
      redirectHome: true
    });
  }
  
 
  render() {
    const { rest_name, content, user_id, rest_id, id } = this.state.review
    return (
      <div>
        <form class="review" onSubmit={this.handleSubmitReview} className={id ? 'edit' : 'create'}>
        {this.state.redirectHome && <Redirect to='/reviews' />}
        {!id && <h2>New Review</h2>}

          <input class="review" type="text" value={this.state.review.rest_name} onChange={this.handleInputChange} name="rest_name" placeholder="Restaurant Name" />
          <textarea
          class="review"
            name='content'
            value={this.state.review.content}
            onChange={this.handleInputChange}
            placeholder="Review"
        />

          <input class="review" type="text" value={this.state.review.rating} onChange={this.handleInputChange} name='rating' placeholder="Rating" />
          <input type="hidden" value={this.state.review.user_id} onChange={this.handleInputChange} name="user_id" placeholder="User id" />
          <input type="hidden" value={this.state.review.rest_id} onChange={this.handleInputChange} name="rest_id" placeholder="Restaurant id" />

          <button type='submit'>{id ? 'Edit' : 'Create'} Review</button>
          <Link to='/'>Cancel</Link>

        </form>
        </div>
      )
  }
}

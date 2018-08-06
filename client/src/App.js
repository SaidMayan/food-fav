import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';
import RestaurantList from './components/RestaurantList';
import RestaurantFilter from './components/RestaurantFilter';
import Login from './components/Login';
import Registration from './components/RegistrationForm';
import {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  login,
  register
} from './services/apiService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      reviews: [],
      currentUser: null
    }

    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.logOut = this.logOut.bind(this);

  }



  fetchRestaurants(term,location) {
    fetch(`/restaurants/${term}/${location}`)
    .then(resp=> {
      if(!resp.ok) throw new Error(resp.statusMessage);
      return resp.json();
    })
    .then(respBody => {
      this.setState({
        restaurants: respBody.data.businesses
      })
    })
  }


  fetchReviews() {
    fetch(`/api/reviews`)
    .then(resp => {
      if(!resp.ok) throw new Error(resp.statusMessage);
      return resp.json();
    })
    .then(respBody => {
      this.setState({
        reviews: respBody.data
      })
    })
  }



createReview(review) {
  const authToken = localStorage.getItem('authToken');
    fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(resp => {
        console.log(resp)
        if (!resp.ok) throw new Error(resp.statusMessage);
        return resp.json();
      })
      .then(resBody => {
        this.setState((prevState, props) => {
          return {
            reviews: prevState.reviews.concat(resBody.data)
          }
        })
      })
  }

deleteReview(id) {
  const authToken = localStorage.getItem('authToken');
  if(authToken){
    fetch(`/api/reviews/${id}`, {
      method: 'DELETE'
    })
      .then(resp => {
        if (!resp.ok) throw new Error(resp.statusMessage);
        return resp.json();
      })
      .then(respBody => {
        this.setState((prevState, props) => {
          return {
            reviews: prevState.reviews.filter(review => review.id !== id)
          }
        })
      })
  }
}

  updateReview(review, id) {
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    if(authToken){
    fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(review),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(resp => {
        if (!resp.ok) throw new Error(resp.statusMessage);
        return resp.json();
      })
      .then(resBody => {
        this.setState((prevState, props) => {
          const { reviews } = prevState;
          const indx = reviews.findIndex(r => r.id === id);
          return {
            reviews: [
              ...reviews.slice(0, indx),
              resBody.data,
              ...reviews.slice(indx + 1)
            ]
          }
        })
      })
  }
}

 handleSubmit(review) {
    this.createReview(review);
  }
  handleDelete(id) {
    this.deleteReview(id);
  }

  handleEdit(review, id) {
    this.updateReview(review, id);
  }

 handleFilterSubmit(options) {
  console.log(options);
  this.fetchRestaurants(options.term, options.location);
 }

checkToken() {
    const authToken = localStorage.getItem('authToken');
    fetch('/api/auth', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(resp => {
      if (!resp.ok) throw new Error(resp.mesage);
      return resp.json();
    })
    .then(respBody => {
      this.setState({
        currentUser: respBody.user
      })
    })
    .catch(err => {
      console.log('not logged in');
      localStorage.removeItem('authToken');
      this.setState({
        currentUser: null
      })
    })
  }

  logOut(){
    localStorage.setItem('authToken', '');
    this.setState (
    {
     currentUser: ""
    }
    )
  }


  componentDidMount() {
    this.fetchReviews();
    this.checkToken();
  }

 handleLogin(creds) {
   login(creds)
    .then(user => this.setState({currentUser: user}));
 }

handleRegistration(creds) {
  register(creds)
   .then(user => this.setState({currentUser: user}));
 }

  render() {
   let Site;
    if(this.state.currentUser){
      Site = (
        <div class="background">
        <HomePage />
        <nav>
          <ul>
            <li><Link to="/search"> Search </Link></li>
            <li><Link to="/reviews">Reviews </Link></li>
            <li><Link to='/new'> Add New Review </Link></li>
            <li><Link to="/" onClick={this.logOut}> Logout</Link></li>
          </ul>
        </nav>
      <Switch>
      <Route exact path="/search" render={() => (<div><RestaurantFilter onSubmit = {this.handleFilterSubmit}  /> <RestaurantList restaurants={this.state.restaurants} /> </div>)} />
      <Route exact path="/reviews" render={() => <ReviewList reviews={this.state.reviews} onDelete={this.handleDelete} onEdit={this.handleEdit}/> } />
      <Route exact path="/new" render={()=> <ReviewForm onSubmit={this.handleSubmit} />} />
      </Switch>
        </div>
      )
    }
      else{
      Site = ( <div className="App">
      <HomePage />
      <br />
       Login:
        <Login onSubmit = {this.handleLogin} />
       Register:
        <Registration onSubmit = {this.handleRegistration} />
        <div>
        <nav>
          <ul>
            <li><Link to="/search"> Search </Link></li>
          </ul>
        </nav>
      <Switch>
      <Route exact path="/search" render={() => (<div><RestaurantFilter onSubmit = {this.handleFilterSubmit}  /> <RestaurantList restaurants={this.state.restaurants} /> </div>)} />
      </Switch>
        </div>


        </div>)

      }

    return (
      <Router>
      <div className="App">
        {Site}
      </div>
      </Router>
    );
  }
}

export default App;

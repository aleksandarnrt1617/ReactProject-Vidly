import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movie from "./components/movie"
import NavBar from "./components/navbar";
import Customers from './components/customers'
import Rentals from './components/rentals'
import MovieDetail from './components/common/movieDetail';
import NotFound from './components/notfound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
import "react-toastify/dist/ReactToastify.css"
import './App.css';
import auth from './services/authService';
class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }


  render() {

    const { user } = this.state
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Route path="/" exact render={props => <Movie {...props} user={this.state.user} />} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }

}

export default App;

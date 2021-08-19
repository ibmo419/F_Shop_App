import './App.css';
import Home from './pages/Home';
import React from 'react'
import {BrowserRouter,Route,Switch } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Feed from "./pages/Feed"
import Navbar from "./Navbar"
import PrivateRoute from './PrivateRoute';
import ContactUs from './ContactUs';
import "bootstrap/dist/css/bootstrap.min.css" ;
import Footer from './Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/ContactUs' component={ContactUs} />
        <PrivateRoute exact path='/feed' component={Feed} />
      </Switch>
      </div>
      <Footer/>
    </BrowserRouter>
    
    </div>
    
  );
}

export default App;

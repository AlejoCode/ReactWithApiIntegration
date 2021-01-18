import React, { Component } from "react";
import SignUp from './SignUp'
import Header from './HeaderComponent'
import Login from './Login'
import Profile from './Profile'
import Footer from './FooterComponent'
import { BrowserRouter, Switch, Route, Redirect, withRouter  } from 'react-router-dom'

import './App.css';

class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path="/home" component={SignUp}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/profile" component={Profile}/>
                        <Redirect to="/home" />
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}

export default (Main);
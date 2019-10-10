import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './../store/store.js';
import jwt_decode from 'jwt-decode';
import setAuthToken from './../utils/setAuthToken';

import { setCurrentUser, logoutUser } from './../actions/authActions';
import { clearCurrentProfile } from './../actions/profileActions';

import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Landing from './layout/Landing';
import Routes from './routing/Routes';

import './../css/App.css';

// check for token
if(localStorage.jwtToken)
{
    // set auth token header auth
    setAuthToken(localStorage.jwtToken);

    // decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);

    // set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // check for expired token
    const currentTime = Date.now() / 1000;

    if(decoded.exp < currentTime)
    {
        store.dispatch(clearCurrentProfile());
        store.dispatch(logoutUser());

        // redirect to login
        window.location.href = '/login';
    }
}

// if(window.performance.navigation.type === 1)
// {
//     localStorage.removeItem('currentPage');
// }

const App = () =>
{
    return(
        <Router>
            <Fragment>
                <Navbar />

                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route component={Routes} />
                </Switch>

                <Footer />
            </Fragment>
        </Router>
    );
}

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import NotFound from './../layout/NotFound';

import Register from './../auth/Register';
import Login from './../auth/Login';

import Dashboard from './../dashboard/Dashboard';
import CreateProfile from './../formProfile/CreateProfile';
import EditProfile from './../formProfile/EditProfile';

import AddExperience from './../formProfile/AddExperience';
import EditExperience from './../formProfile/EditExperience';
import AddEducation from './../formProfile/AddEducation';
import EditEducation from './../formProfile/EditEducation';

import Profiles from './../profiles/Profiles';
import Profile from './../profile/Profile';

import Posts from './../posts/Posts';
import Post from './../post/Post';

import Following from './../following/Following';

const Routes = () => 
{
    return (
        <section className='container'>
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />

                <Route exact path='/profiles' component={Profiles} />
                <Route exact path='/profile/:id' component={Profile} />

                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                <PrivateRoute exact path='/edit-profile' component={EditProfile} />

                <PrivateRoute exact path='/add-experience' component={AddExperience} />
                <PrivateRoute exact path='/edit-experience/:exp_id' component={EditExperience} />
                <PrivateRoute exact path='/add-education' component={AddEducation} />
                <PrivateRoute exact path='/edit-education/:edu_id' component={EditEducation} />

                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/post/:id' component={Post} />

                <PrivateRoute exact path='/following' component={Following} />

                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Routes;

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from '../components/Auth/LoginPage';

export const AuthRouter = () => {
    return (

        <div>
            <Switch>
                <Route 
                    exact
                    path="/auth/login" 
                    component={ LoginPage }
                />

                <Redirect to="/auth/login" />

            </Switch>
        </div>
        
    );
};

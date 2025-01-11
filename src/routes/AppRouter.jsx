import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { VetRouter } from './VetRouter';
import { PublicRoute } from './PublicRoute';
import { getDollarData } from '../helpers';
import { DollarSidebar } from '../actions/sidebar';
// import { startGetAllUsersActive } from '../actions/login';

export const AppRouter = () => {
    
    const dispatch = useDispatch();
    const { auth } = useSelector( state => state.login );

    const [isLoggedIn, setIsLoggedIn] = useState( false );

    useEffect(async () => {
        console.log(auth);
        if( auth.isAutenticated ) {

            const dollarValue = await getDollarData();
            if(dollarValue != undefined) {
                dispatch( DollarSidebar(Math.round(dollarValue)) );
            }
            
            // if( usersActive.length === 0 ) {
            //     dispatch( startGetAllUsersActive() );
            // }

            setIsLoggedIn( true );

        } else {
            setIsLoggedIn( false );
        }

    }, [ dispatch, setIsLoggedIn, auth] );

    return (
        <Router>

            <div>
                <Switch>
                    
                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <VetRouter
                        exact
                        isAuthenticated={ isLoggedIn }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    ) 
}

import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { useAuth } from './Hooks/useAuth';
import {useRoutes} from './Routes';
import {AuthContext} from './Context/AuthContext';
import 'materialize-css';
import './App.css'

export const App = () => {
    const {token, login, logout, userId} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);
    return (
        <AuthContext.Provider value={{
            token,login,logout, userId, isAuthenticated
        }}>
            <Router>
                {routes}
            </Router>
        </AuthContext.Provider>
        
    );
}


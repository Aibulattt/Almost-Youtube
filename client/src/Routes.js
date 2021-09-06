import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Authorization } from './Components/Authorization/Authtorization';
import { SearchM } from './Components/Search/Search';
import { Favourites } from './Components/Favoutites/Favourites';
import { Registration } from './Components/Registraition/Registration';

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path='/Search' exact component={SearchM}/>
                <Route path='/Favourites' component={Favourites}/>
                <Redirect to='/Search' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path='/' component={Authorization}/>
            <Route path='/Registration' component={Registration}/>
            <Redirect to='/' />
        </Switch>
    )
}
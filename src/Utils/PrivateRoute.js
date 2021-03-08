import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getToken} from './Common';

// Destructuring: {component: Component, ...rest}=props;
let PrivateRoute=({component: Component, ...rest})=>{
    return(
        <Route {...rest} render={(props)=>{
            return getToken()?<Component {...props} />:<Redirect to={{pathname:'/', state:{from: props.location}}}/>
        }}/>
    )}

export default PrivateRoute;
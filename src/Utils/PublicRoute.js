import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getToken} from './Common';

let PublicRoute=({component: Component, ...rest})=>{
    return(
        <Route {...rest} render={(props)=>{
            //Sau khi đăng nhập chuyển hướng đến ListCompany
            return !getToken()?<Component {...props}/>:<Redirect to={{pathname:'home'}}/>
        }}/>
    )
}

export default PublicRoute;
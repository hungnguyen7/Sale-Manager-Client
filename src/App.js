import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import { BrowserRouter, Switch } from "react-router-dom";
// import PrivateRoute from './Utils/PrivateRoute'
import PublicRoute from './Utils/PublicRoute'
import {Navbar, Nav} from 'react-bootstrap';

import WareHouse from './Components/WareHouse'
class App extends React.Component{
  render(){
    return(
      <div className='App'>
          <BrowserRouter>
            <Navbar bg="light" expand="lg">
            <LinkContainer to = '/'>
              <Navbar.Brand>Develop by Hung Nguyen</Navbar.Brand>
            </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <LinkContainer to = "/buyer">
                    <Nav.Link>Người mua</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to = '/seller'>
                    <Nav.Link>Người bán</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to = "/warehouse">
                    <Nav.Link>Kho</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Switch>
              <PublicRoute path='/warehouse' component={WareHouse}/>
            </Switch>
          </BrowserRouter>
      </div>
    )
  }
}

export default App;

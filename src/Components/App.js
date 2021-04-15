import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import AdminPanel from './AdminPanel';
import Header from './Header';
import PunDisplay from './PunDisplay';
import SubmitPun from './SubmitPun';
import Authenticate from './Authenticate';
import Login from './Login';

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={PunDisplay} />
          <Route path="/submit" component={SubmitPun} />
          <Route path="/login" component={Login} />
          <Route 
            path="/admin"
            render={() => (
              <Authenticate cookies={props.cookies}>
                <AdminPanel cookies={props.cookies}/>
              </Authenticate>
            )}
           />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default withCookies(App);
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import AdminPanel from './AdminPanel/Puns';
import UsersPanel from './AdminPanel/UsersPanel';
import UserDashboard from './UserDashboard';
import Header from './Header';
import PunDisplay from './PunDisplay';
import SubmitPun from './SubmitPun';
import Authenticate from './Authenticate';
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout';

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={PunDisplay} />
          <Route path="/submit" component={SubmitPun} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route 
            path="/admin/puns"
            render={() => (
              <Authenticate cookies={props.cookies} role={'admin'}>
                <AdminPanel cookies={props.cookies}/>
              </Authenticate>
            )}
           />
          <Route 
            path="/admin/users"
            render={() => (
              <Authenticate cookies={props.cookies} role={'admin'}>
                <UsersPanel cookies={props.cookies}/>
              </Authenticate>
            )}
           />
          <Route 
            path="/dashboard"
            render={() => (
              <Authenticate cookies={props.cookies} role={'user'}>
                <UserDashboard cookies={props.cookies}/>
              </Authenticate>
            )}
           />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default withCookies(App);
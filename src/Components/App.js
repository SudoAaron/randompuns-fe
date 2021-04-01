import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Admin from './Admin';
import Header from './Header';
import PunDisplay from './PunDisplay';
import SubmitPun from './SubmitPun';
// import Contact from './Contact';
// import LoginPage from './LoginPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={PunDisplay} />
          <Route path="/submit" component={SubmitPun} />
          {/* <Route path="/contact" component={Contact} /> */}
          <Route path="/admin" component={Admin} />
          {/* <Route path="/login" component={LoginPage} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Admin from './Components/Admin';
import Header from './Components/Header';
import PunDisplay from './Components/PunDisplay';
import SubmitPun from './Components/SubmitPun';
import Contact from './Components/Contact';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={PunDisplay} />
          <Route path="/submit" component={SubmitPun} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

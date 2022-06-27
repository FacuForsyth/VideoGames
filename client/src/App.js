import './App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Landing';
import Videogames from './components/Videogames';

function App() {
  return (
    <BrowserRouter>

    <div className="App">
      <Switch>
         <Route exact path= '/' component={LandingPage} />
         <Route exact path= '/videogames' component={Videogames} />
      </Switch>
    </div>

    </BrowserRouter>
  );
}

export default App;

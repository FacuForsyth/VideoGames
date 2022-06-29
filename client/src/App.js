import './App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Landing';
import Videogames from './components/Videogames';
import GameCreate from './components/GameCreate';

function App() {
  return (
    <BrowserRouter>

    <div className="App">
      <Switch>
         <Route exact path= '/' component={LandingPage} />
         <Route exact path= '/videogames' component={Videogames} />
         <Route exact path= '/videogame' component={GameCreate} />

      </Switch>
    </div>

    </BrowserRouter>
  );
}

export default App;

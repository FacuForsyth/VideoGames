import './App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Landing';
import Videogames from './components/Videogames';
import GameCreate from './components/GameCreate';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>

    <div className="App">
      <Switch>
         <Route exact path= '/' component={LandingPage} />
         <Route exact path= '/videogames' component={Videogames} />
         <Route exact path= '/videogame' component={GameCreate} />
         <Route exact path= '/videogames/:id' component={Detail} />
      </Switch>
    </div>

    </BrowserRouter>
  );
}

export default App;

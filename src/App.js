
import './App.css';

import React from 'react'
import {Route,Switch} from "react-router-dom"
import Home from './Components/Homepage/Home';
import FoodDetail from './Components/FoodDetails/FoodDetail';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" 
        render={(props) => <Home {...props} />}
        />
        <Route  path="/food/:id" 
        render={(props) => <FoodDetail {...props} />}
        />
      </Switch>
      
      
    </div>
  )
}

export default App

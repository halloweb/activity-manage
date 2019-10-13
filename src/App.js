import React from 'react';
import { Route, Redirect} from "react-router-dom"
import View from './view'
function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => ( <Redirect to="/view/dashboard"/>)}/>
      <Route path='/view/:page' component={View}/>
    </div>
  )
}

export default App;

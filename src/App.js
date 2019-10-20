import React from 'react';
import { Route, Redirect} from "react-router-dom"
import View from './view'
import Login from './view/login'
import AuthRouter from './view/login/AuthRouter'
function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => ( <Redirect to="/view/dashboard"/>)}/>
      <AuthRouter path='/view/:page' component={View}/>
      <Route path='/login' component={Login}/>
    </div>
  )
}

export default App;

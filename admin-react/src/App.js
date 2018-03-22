import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'
import './App.css';
import ajax from './api/index'
import Home from './components/index'
import Login from './components/login/login'

window.fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        window.fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

class App extends Component {
    componentWillMount(){
        window.ajax = ajax
        if(localStorage.user){
            window.fakeAuth.isAuthenticated = true
        }
    }
  render() {
    return (
      <div className="App">
          <Router>
              <div style={{width:'100%',height: '100%'}}>
                  {/*需要权限*/}
                  <PrivateRoute exact path="/" component={Home}/>
                  {/*不需要权限*/}
                  <Route path="/login" component={Login}/>
              </div>
          </Router>
      </div>
    );
  }
}

export default App;



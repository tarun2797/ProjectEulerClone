import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Questions from './components/questions_display'
import Questions from './components/questions_display_material_UI'
import LoginView from './views/loginView'
import Logout from './views/logout'
import Register from './components/register'
import SubmitAnswer from './components/submit_answer'
import EditProfile from './components/editProfile'
import MyProfile from './components/myprofile'
import AddQuestion from './components/addQuestion'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <div>
        <Router>
              <div>
              <Route path="/eulerprojectfe/questions" component={Logout} />
              <Route exact path="/eulerprojectfe/questions/view-all" component={Questions} />
              <Route exact path="/eulerprojectfe/questions/view/:id" component={SubmitAnswer} />
              <Route exact path="/eulerprojectfe/questions/myprofile" component={MyProfile} />
              <Route exact path="/eulerprojectfe/questions/editprofile" component={EditProfile} />
              <Route exact path="/eulerprojectfe/login" component={LoginView} />
              <Route exact path="/eulerprojectfe/AddQuestion/" component={AddQuestion} />
              </div>
        </Router>
        <div>

        </div>
        </div>
    );
  }
}

export default App;

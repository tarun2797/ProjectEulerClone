import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom'
import { withRouter } from 'react-router'

class Login extends Component {

 constructor(props){
  super(props);
  this.state={
  jwt_url : '/api-jwttoken-auth/',
  username:'',
  password:''
  }
  this.handleChange = this.handleChange.bind(this)
 }

 cookies = new Cookies();

 handleChange(event){
    this.setState({
        [event.target.name]:event.target.value
    })
 }

 handleClick(event){
    //alert("You have Logged in\n your username : "+this.state.username+"\nyour password : "+this.state.password)

        var formData  = new FormData();
        formData.append('username',this.state.username);
        formData.append('password',this.state.password);

        fetch(this.state.jwt_url, {
            method: 'post',
            body: formData,
          }) .then(function(response) {
            return response.json();
        })
        .then((myJson) => {
            if ('token' in myJson){

                localStorage.setItem('user', this.state.username);
                localStorage.setItem('userJwtToken',myJson.token);

                //const dumy = localStorage.getItem('myCat');
                //console.log('testing local storage = ',dumy)

                console.log('local storage user = ',localStorage.getItem('user'))
                console.log('local storage userJwtToken = ',localStorage.getItem('userJwtToken'))

                //alert("Logged in i guess")
                //console.log("Validated")
//                console.log("date = ",new Date(Date.now()+(60*60*24*365*365)))
//                this.cookies.set('userJwtToken', myJson, { path: '/',expires: new Date(Date.now()+(60*60*24*365*365)) });
//                this.cookies.set('username',formData.get('username'), {path : '/',expires: new Date(Date.now()+(60*60*24*365*365)) })
//                console.log("token = ",this.cookies.get('userJwtToken'));
                this.props.onSuccessfulLogin();
            }
            else{
                alert("Invalid Credentials");
                console.log("In valid")
            }
        })
        .catch(e => {console.log("Error occured in fetching students..")});
    }

 render() {
    console.log("Version = ",React.version)
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
             titleStyle={{textAlign: "center"}}
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             name = "username"
             style={style1}
             value = {this.state.username}
             onChange = {this.handleChange}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               name = "password"
               style={style1}
               value = {this.state.password}
               onChange = {this.handleChange}
               />
             <br/>
             <br/>
             <RaisedButton label="Submit" primary={true} style={style2} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style1 = {
 margin: 1,
 position:"relative",
 left:600
};
const style2 = {
 margin: 1,
 position:"relative",
 left:675
};

export default Login;
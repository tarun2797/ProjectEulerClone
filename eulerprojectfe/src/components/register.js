import React , { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Cookies from 'universal-cookie';

class Register extends Component{

    constructor(){
        super();
        this.state = {
            register_url:"/my_account/api/users/",
            username:"",
            password:"",
            email:""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
    this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleClick(event){
        console.log("values --",this.state);

        var formData  = new FormData();
        formData.append('username',this.state.username);
        formData.append('password',this.state.password);
        formData.append('email',this.state.email)

        //var data = this.state;

        fetch(this.state.register_url, {
          method: 'POST', // or 'PUT'
          body: formData, // data can be `string` or {object}!
        }).then(res => res.json())
        .catch(error => {
            console.error('Error:', error);
            alert("There was a problem in Registering... Try Again")
        })
        .then(response => {
            console.log('Success:', response);
            if(response!==undefined){
                alert("Thank You For Registering\n Login and Continue...");
            }
        });
    }

    render(){
        return(
            <div>
            <MuiThemeProvider>
            <div>
            <AppBar
             title="Register"
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
              <TextField
               hintText="Enter your Email"
               floatingLabelText="Email"
               name = "email"
               style={style1}
               value = {this.state.email}
               onChange = {this.handleChange}
               />
             <br/><br/>
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
export default Register;
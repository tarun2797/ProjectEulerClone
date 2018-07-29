import React , {Component} from 'react';
import Cookies from 'universal-cookie';
import Login from 'C:/EulerProject/eulerprojectfe/src/components/login'
import Register from '../components/register'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";


class LoginView extends Component{

    constructor(){
        super();
        this.state = {
            dumy:"dumy",
            screen:[],
            message:'',
            buttonLabel:'',
            isLogin:true
        }
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount(){
        var screen=[];
        screen.push(<Login onSuccessfulLogin = {this.handleSuccessfulLogin}/>);
        var message = "Not registered yet, Register Now";
        this.setState({
            screen:screen,
            message:message,
            buttonLabel:"Register"
        })
    }

    cookies = new Cookies();

    isAuthenticated(){
//        if (this.cookies.get('userJwtToken') === undefined){
//            return false;
//        }
//        else{
//            return true;
//        }
        if (localStorage.getItem('user') == null){
            return false;
        }
        else{
            return true;
        }
    }

    handleSuccessfulLogin(){
        console.log("Ready to render again")
        this.setState({
            dumy:"dumy"
        });
    }

    handleClick(event){
        //alert("You have submitted")
        var message;
        if(this.state.isLogin){
          var screen=[];
          screen.push(<Register parentContext={this}/>);
          message = "Already registered.Go to Login";
          this.setState({
                screen:screen,
                message:message,
                buttonLabel:"Login",
                isLogin:false
          })
        }
        else{
          var screen=[];
          screen.push(<Login onSuccessfulLogin = {this.handleSuccessfulLogin}/>);
          message = "Not Registered yet.Go to registration";
          this.setState({
                screen:screen,
                message:message,
                buttonLabel:"Register",
                isLogin:true
          })
        }
    }

    render(){

    const isLoggedIn = this.isAuthenticated();
    console.log("check login = ",isLoggedIn," , value = ",this.cookies.get('userJwtToken'))
        return(
            <div>
                {isLoggedIn ? <Redirect to='/eulerprojectfe/questions/view-all'/> : (
                <div>
                    <div>
                        {this.state.screen}
                        <br/>

                        <p style={{position:"relative",left:620}} >
                            {this.state.message}
                        </p>
                    </div>
                    <MuiThemeProvider>
                    <div>
                        <br/>
                        <RaisedButton label={this.state.buttonLabel} primary={true} style={style2} onClick={this.handleClick}/>
                    </div>
                    </MuiThemeProvider>
                </div>
                )}
            </div>
        );
    }
}
const style2 = {
 margin: 1,
 position:"relative",
 left:666
};
export default LoginView;
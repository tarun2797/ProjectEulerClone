import React , { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";
import MyProgress from '../components/myProgress'

import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

class Logout extends Component{

    cookies = new Cookies();

    constructor(props){
        super(props);
        this.state = {
            "open": false,
            "show":null
        }
    }

    handleToggle = () => this.setState({open: !this.state.open});

    setProblems = () => {
        this.setState({show: 'problems', open: false });
    };

    setProfile = () => {
        this.setState({show: 'myprofile', open: false });
    };

    setEditProfile = () => {
        this.setState({show: 'editprofile', open: false });
    }

    setProgress = () => {
        this.setState({show: 'myprogress', open: false });
        this.setState({ openDialog: true });
    }

    unsetProgress = () => {
        this.setState({ openDialog: false });
    }

    handleLogout(event){
//        this.cookies.remove('userJwtToken');
//        this.cookies.remove('username');
//        this.cookies.set('userJwtToken',"", { path: '/',expires: new Date(Date.now()-30)} );
//        this.cookies.set('username',"", {path : '/', expires: new Date(Date.now()-30)})
//        console.log(this.cookies.get('userJwtToken'));
        localStorage.removeItem('user');
        localStorage.removeItem('userJwtToken');

        console.log("local storage - removed token");
        this.setState({dumy:"dumy"});
    }

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

    unSetShow(){
        this.setState({show:null})
    }

    componentWillMount(){
        this.setState({show:null})
    }

    render(){

        const isLoggedIn = this.isAuthenticated();
        console.log("in logout , token = ,",isLoggedIn," , value = ",this.cookies.get('userJwtToken'))
        return(
            <div>
                {!isLoggedIn ? <Redirect to='/eulerprojectfe/login'/> : (
                   <div>
                        <MuiThemeProvider>
                        <AppBar
                            title = "Project Euler"
                            titleStyle={{textAlign: "center",fontFamily: "Comic Sans MS",}}
                            iconElementRight={<RaisedButton label="LogOut" primary={true} style={style} onClick={(event) => this.handleLogout(event)}/>}
                            onTouchTap={this.handleLogout.bind(this)}
                            onLeftIconButtonClick={this.handleToggle}
                        />
                        <Drawer
                            docked={false}
                            width={200}
                            open={this.state.open}
                            onRequestChange={(open) => this.setState({open})}>

                            <AppBar title="Menu"/>
                            <MenuItem id="showBarId" onClick={this.setProblems}>Problems</MenuItem>
                            <MenuItem id="showFooId" onClick={this.setProfile}>My Profile</MenuItem>
                            <MenuItem id="editprofile" onClick={this.setEditProfile}>Edit Profile</MenuItem>
                            <MenuItem id="myprogress" onClick={this.setProgress}>My Progress</MenuItem>
                        </Drawer>
                        </MuiThemeProvider>
                        {this.state.show==='problems' &&(
                            <div>
                                <Redirect to='/eulerprojectfe/questions/view-all'/>
                                { this.unSetShow()}
                            </div>
                        )}
                        {this.state.show==='myprofile' &&(
                            <div>
                                <Redirect to='/eulerprojectfe/questions/myprofile/'/>

                            </div>
                        )}
                        {this.state.show==='editprofile' &&(
                            <div>
                                <Redirect to='/eulerprojectfe/questions/editprofile'/>

                            </div>
                        )}
                        {this.state.show==='myprogress' &&(
                            <div>
                                <MyProgress openDialog={this.state.openDialog} handleClose={this.unsetProgress}/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
const style = {
 margin: 1,
};
export default Logout;
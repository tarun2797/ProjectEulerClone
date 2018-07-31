import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Typography from '@material-ui/core/Typography';
import EditProfile from '../components/editProfile'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width:"50%",
    //padding: theme.spacing.unit * 2,
    position:"relative",
    left:150,
    backgroundColor: "#80cbc4",
    fontFamily: "Comic Sans MS",
    textAlign: 'center',
    color:"black",
    marginTop:  theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft:theme.spacing.unit*2,
    paddingRight:theme.spacing.unit*2,
  },
});


class MyProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            profile:"",
            username:"",
            location:"",
            bio:"",
            birth_date:"",
            email:"",
            redirect:false
        }
       this.handleClick = this.handleClick.bind(this)
    }

    cookies = new Cookies();

    componentDidMount(){

        fetch(`/my_account/api/my_profile/`,
            {
            method: 'get',
            headers: new Headers({
            'Authorization': 'JWT '+ localStorage.getItem('userJwtToken'),
            'Content-type': 'application/json'
                }),
            })
            .then(results =>{
                return results.json();
            })
            .then(data => {
                console.log(data);
                this.setState({profile:data});
                this.setState({username:data.user.username});
                this.setState({location:data.location});
                this.setState({bio:data.bio});
                this.setState({birth_date:data.birth_date});
                this.setState({email:data.user.email});
                console.log("profile = ",this.state.profile)
            })
            .catch(e => {console.log("Error occured in fetching students..")});
    }

    unSetRedirect(){
        this.setState({
                redirect:false
            })
    }


     handleClick(event){
        this.setState({
            redirect:true
        })
     }

    render(){

        const { classes } = this.props;

        return(
            <div>
            <div className={classes.root}>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>

                    <pre style={{position:'relative', left:"200",color:"black",fontFamily: "Comic Sans MS",}}>
                    <Paper className={classes.paper}>
                      username    :   {this.state.username}
                    </Paper>
                    </pre>
                    </Grid>
                    <Grid item xs={6}>
                      <pre>
                        <Paper className={classes.paper}>
                          Email    :   {this.state.email}
                      </Paper>
                      </pre>
                    </Grid>
                    <Grid item xs={6}>
                      <pre>
                        <Paper className={classes.paper}>
                          place   :   {this.state.location}
                      </Paper>
                      </pre>
                    </Grid>
                    <Grid item xs={6}>
                      <pre>
                        <Paper className={classes.paper}>
                          About me    :   {this.state.bio}
                      </Paper>
                      </pre>
                    </Grid>
                    <Grid item xs={6}>
                      <pre>
                        <Paper className={classes.paper}>
                          Birth Date    :   {this.state.birth_date}
                      </Paper>
                      </pre>
                    </Grid>
                  </Grid>
             </div>
            <MuiThemeProvider>
             <RaisedButton label="Edit Profile" primary={true} style={style2} onClick={this.handleClick}/>
             </MuiThemeProvider>
             {(this.state.redirect &&
                <div>
                    <Redirect to='/eulerprojectfe/questions/editprofile'/>
                    {this.unSetRedirect()}
                </div>
             )}
            </div>
        );
    }
}

const style2 = {
 margin: 1,
 position:"relative",
 top:30,
 left:620
};

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyProfile);
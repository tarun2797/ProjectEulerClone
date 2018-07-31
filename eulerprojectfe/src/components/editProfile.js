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

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: "Comic Sans MS",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    fontFamily: "Comic Sans MS",
  },
  menu: {
    width: 200,
  },
  paper: {
    width:"80%",
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop:  theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft:theme.spacing.unit*2,
    paddingRight:theme.spacing.unit*2,
  },
});


class EditProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            profile:"",
            username:"",
            location:"",
            bio:"",
            birth_date:"",
            email:""
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

    handleChange = name => event => {
            this.setState({
              [name]: event.target.value,
            });
        };

     handleClick(event){
        console.log("username , loc , bio , bday ==> ",this.state.username,this.state.location,this.state.bio,this.state.birth_date)
        console.log("bday = ",this.state.birth_date)
        var formData = new FormData();
        formData.append('bio',this.state.bio);
        formData.append('location',this.state.location);
        if(this.state.birth_date)
        {
            formData.append('birth_date',this.state.birth_date);
        }
        formData.append('email',this.state.email)

        fetch('/my_account/api/my_profile/', {
          method: 'PUT',
          body: formData,
          headers: new Headers({
                 'Authorization': 'JWT '+ localStorage.getItem('userJwtToken'),
          }),
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response)
            alert("YOUR DATA HAS BEEN SAVED SUCCESSFULLY")
            this.componentDidMount()
            this.setState({dumy:"dumy"})
        });
     }

//     componentWillMount(){
//        this.setState({dumy:"dumy"})
//    }

    render(){

        const { classes } = this.props;

        return(
            <div>
            <Paper
                  className={classes.paper}
                  style={{
                        position:'relative',
                        left:150,
                        backgroundColor:"#80cbc4",
                        fontFamily: "Comic Sans MS",
                        color:"black",
                        fontSize: 25,
                  }}
            >
            <Typography variant="headline" component="h3" >
             <p style= {{ fontFamily:"Comic Sans MS"}}> My Profile  </p>
            </Typography>

                <TextField
                  id="username"
                  label="username"
                  className={classes.textField}
                  defaultValue={this.state.username}
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                  InputProps={{
                    readOnly: true,
                  }}
                  margin="normal"
                />
                <br/>

                <TextField
                  id="email"
                  label="Email"
                  defaultValue=""
                  value={this.state.email}
                  className={classes.textField}
                  onChange={this.handleChange('email')}
                  margin="normal"
                />

                <TextField
                  id="location"
                  label="Place"
                  defaultValue=""
                  value={this.state.location}
                  className={classes.textField}
                  onChange={this.handleChange('location')}
                  margin="normal"
                />


                 <br/><br/>

                <TextField
                  id="bio"
                  label="Biography"
                  multiline
                  rowsMax="4"
                  value={this.state.bio}
                  placeholder="I like ----"
                  onChange={this.handleChange('bio')}
                  className={classes.textField}
                  margin="normal"
                />

                <TextField
                  id="birthday"
                  label="birth day"
                  className={classes.textField}
                  helperText="yyyy-mm-dd"
                  value={this.state.birth_date}
                  onChange={this.handleChange('birth_date')}
                  margin="normal"
                />
                 <br/><br/>
            </Paper>
            <MuiThemeProvider>
             <RaisedButton label="Save" primary={true} style={style2} onClick={this.handleClick}/>
             </MuiThemeProvider>
            </div>
        );
    }
}

const style2 = {
 margin: 1,
 position:"relative",
 top:30,
 left:675
};

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfile);
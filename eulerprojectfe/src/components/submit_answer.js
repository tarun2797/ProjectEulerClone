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
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = theme => ({
  root: {
    flexGrow: 1,
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


class SubmitAnswer extends Component{

    constructor(props){
        super(props);
        this.state = {
            question:"",
            answer:"",
            solved:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    cookies = new Cookies();

    isSolvedAlready(){
        //http://127.0.0.1:8000/my_account/api/my_profile/
        fetch(`/my_account/api/my_profile/`,
        {
          method: 'get', // or 'PUT'
          headers: new Headers({
                 'Authorization': 'JWT '+ localStorage.getItem('userJwtToken'),
                 'Content-type': 'application/json'
          }),
        }).then(res => res.json())
        .catch(error => {
                console.error('Error:', error)
         })
        .then(response => {
                console.log('Success:', response.solved_qs)
                //alert(response.stuatus)
                var solved_qs_obj = JSON.parse(response.solved_qs)
                console.log("Solved qs obj = ",solved_qs_obj)
                console.log("present question id = ",this.props.match.params.id)
                console.log("checking includes fun => ",solved_qs_obj.includes(Number(this.props.match.params.id)))
                this.setState({solved:solved_qs_obj.includes(Number(this.props.match.params.id))})
         });
    }

     handleChange(event){
        console.log("answer = ",event.target.value)
        console.log("field = ",event.target.name)
        this.setState({
            [event.target.name]:event.target.value
        })
     }

     handleClick(event){
        //alert(this.state.answer)
        console.log("submitted answer => ",this.state.answer)
        var formData  = new FormData();
        formData.append('answer',this.state.answer);

        //var data = this.state;

        fetch(`/my_account/api/questions/${this.props.match.params.id}/`,
        {
          method: 'POST', // or 'PUT'
          body: formData, // data can be `string` or {object}!
          headers: new Headers({
                    'Authorization': 'JWT '+ localStorage.getItem('userJwtToken'),
            }),
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
                console.log('Success:', response)
                alert(response.status)
                this.componentDidMount()
         });

     }

    componentDidMount(){

        //'http://127.0.0.1:8000/my_account/api/questions/view'
        fetch(`/my_account/api/questions/${this.props.match.params.id}/`,
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
                this.setState({
                    question:data
                });
            })
            .catch(e => {console.log("Error occured in fetching students..")});

            this.isSolvedAlready()
//            this.setState({dumy:"dumy"})
    }

    render(){

        const { classes } = this.props;

        //const solved = this.isSolvedAlready();

        console.log("Already solved : ",this.state.solved)

        return(
            <MuiThemeProvider>
            <div className={classes.root}>
                  <Grid container spacing={24}>
                    <Grid item xs={5} >
                      <Paper
                            className={classes.paper}
                            style={{
                                    position:'relative',
                                    left:468,
                                    backgroundColor:"#4db6ac",
                                    fontFamily: "Comic Sans MS",
                                    color:"black",
                                    fontSize: 21,
                                }}
                      >
                         {this.state.question.id} . {this.state.question.title}
                      </Paper>
                    </Grid>
                    <Grid item xs={12}  >
                      <Paper
                            className={classes.paper}
                            style={{
                                    position:'relative',
                                    left:150,
                                    backgroundColor:"#aed581",
                                    fontFamily: "Comic Sans MS",
                                    color:"black",
                                    fontSize: 23,
                            }}
                      >
                            {this.state.question.description}
                       </Paper>
                    </Grid>
                  </Grid>
                  { !this.state.solved &&(
                      <div>
                      <TextField
                           hintText="Submit your Answer"
                           floatingLabelText="Answer"
                           name = "answer"
                           style={{position:'relative',left:586,top:30}}
                           value = {this.state.answer}
                           onChange = {this.handleChange}
                      />
                      <br/><br/>
                      <RaisedButton
                            label="Submit"
                            primary={true}
                            style={{position:'relative',left:665,top:30}}
                            onClick={this.handleClick}
                      />
                      </div>
                   )}
                   {
                    this.state.solved &&(
                      <div>
                        <h3 style={{position:"relative",left:560,top:30,fontFamily: "Comic Sans MS",color:"red"}}>YOU HAVE ALREADY SOLVED THIS</h3>
                      </div>
                   )}
            </div>
            </MuiThemeProvider>
        );
    }
}

SubmitAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubmitAnswer);
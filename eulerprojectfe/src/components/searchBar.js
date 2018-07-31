import React , { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from '@material-ui/core/Paper';
import TextField from 'material-ui/TextField';

class SearchBar extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.props.handleSearch(event.target.value);
    }

    render(){
        return(
        <div>
            <MuiThemeProvider>
            <div>

            <Paper style={style2} >
            Go to Problem
            </Paper>

             <TextField
                 hintText="Search id..."
                 type="search"
                 floatingLabelText="    id / title.."
                 name = "question_id"
                 style = {style1}
                 floatingLabelFocusStyle={style1.floatingLabelFocusStyle}
                 value = {this.props.search}
                 onChange = {this.handleChange}
             />

             </div>
             </MuiThemeProvider>
         </div>
        );
    }
}

const style1 = {
 margin: 1,
 width:110,
 position:"relative",
 left:320,
 top:-5,
 floatingLabelFocusStyle: {
        color: "#ff8a80"
 }
};

const style2 = {
   width:130,
   height:30,
   position:"relative",
   fontFamily:"Comic Sans MS",
   backgroundColor:"#ef5350",
   left:170,
   top:60,
   textAlign:"center"
}

export default SearchBar;

//<RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
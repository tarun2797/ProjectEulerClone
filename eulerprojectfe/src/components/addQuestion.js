import React , { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Cookies from 'universal-cookie';

class AddQuestion extends Component{

    constructor(){
        super();
        this.state = {
            addQuestion_url:"/my_account/api/questions/",
            title:"",
            description:"",
            answer:""
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
        formData.append('title',this.state.title);
        formData.append('description',this.state.description);
        formData.append('answer',this.state.answer)

        //var data = this.state;

        fetch(this.state.addQuestion_url, {
          method: 'POST', // or 'PUT'
          body: formData, // data can be `string` or {object}!
          headers: new Headers({
                 'Authorization': 'JWT '+ localStorage.getItem('userJwtToken'),
          }),
        }).then(res => res.json())
        .catch(error => {
            console.error('Error:', error);
            alert("There Was a Problem in adding question...")
        })
        .then(response => {
            console.log('Success:', response) ;
            alert("Your Question has been Added...")
        });
    }

    render(){
        return(
            <div>
            <MuiThemeProvider>
            <div>
            <AppBar
             title="Add Question - Project Euler"
             titleStyle={{textAlign: "center",fontFamily:"Comic Sans MS"}}
             />
             <TextField
             hintText="Enter title"
             floatingLabelText="Title"
             name = "title"
             style={style1}
             value = {this.state.title}
             onChange = {this.handleChange}
             />
           <br/>
             <TextField
               hintText="Write Description"
               floatingLabelText="Description"
               name = "description"
               multiline
               rowsMax="4"
               style={style1}
               value = {this.state.description}
               onChange = {this.handleChange}
               />
            <br/>
              <TextField
               hintText="Enter answer"
               floatingLabelText="Answer"
               name = "answer"
               style={style1}
               value = {this.state.answer}
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
export default AddQuestion;
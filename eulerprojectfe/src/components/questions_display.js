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
import Paper from 'material-ui/Paper';

class Questions extends Component{

    constructor(){
        super();
        this.state = {
            questions : [],
        };
    }

    cookies = new Cookies();

    componentDidMount(){

        const isLoggedIn = this.isAuthenticated();

        if(isLoggedIn){

            console.log("jwt token check = ",'JWT '+this.cookies.get('userJwtToken').token)

            fetch('http://127.0.0.1:8000/my_account/api/questions/',{
                 method: 'get',
                 headers: new Headers({
                 'Authorization': 'JWT '+this.cookies.get('userJwtToken').token,
                 'Content-type': 'application/json'
                 }),
            })
            .then( results =>{
                return results.json();
            }).then(data=>{
                let questions = data.map(question=>{
                    return(

                            <tr key = {question.title}>
                            <td>{question.id}</td>
                            <td>{question.title}</td>
                            </tr>

                    );
                })
                this.setState({
                    questions : questions
                })
            })
            .catch(e => {console.log("Error occured in fetching..")});
        }
    }

    isAuthenticated(){
        if (this.cookies.get('userJwtToken') === undefined){
            return false;
        }
        else{
            return true;
        }
    }

    render(){
        const isLoggedIn = this.isAuthenticated();
        return(
         <div>
                {!isLoggedIn ? <Redirect to='/eulerprojectfe/login/'/> : (
                <paper>
                        <div className = "question_list">
                        <MuiThemeProvider>

                            <table>
                                {this.state.questions}
                            </table>

                        </MuiThemeProvider>
                        </div>
                 </paper>
                )}
         </div>
        );
    }
}
export default Questions;
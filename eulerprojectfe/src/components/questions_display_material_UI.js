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
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RaisedButton from 'material-ui/RaisedButton';
import RemoveIcon from '@material-ui/icons/Remove';
import DoneIcon from '@material-ui/icons/Done';
import SearchBar from '../components/searchBar'

const theme1 = createMuiTheme({
  palette: {
    primary: {
      main: '#4db6ac',
      body_row:"#aed581",
    },
    secondary: {
      main: '#263238',
    },
  },
});

const CustomTableCell = withStyles(theme => ({


  head: {
    textAlign:"center",
    backgroundColor: theme1.palette.primary.main,
    color: theme1.palette.secondary.main,
    fontSize: 18,
  },
  body: {
    textAlign:"center",
    backgroundColor: theme1.palette.primary.body_row,
    fontSize: 16,
  },
}))(TableCell);


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 0,
    paddingLeft:theme.spacing.unit*2,
    paddingRight:theme.spacing.unit*2,
    position:"relative",
    left:110,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Questions extends Component{

    constructor(props){
        super(props);
        this.state = {
            questions : [],
            page: 0,
            rowsPerPage: 5,
            search:""
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    cookies = new Cookies();

    getUserSolvedQuestions(){

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
                if(data.solved_qs==''){
                    data.solved_qs = '[ ]';
                }
                this.setState({no_of_questions:JSON.parse(data.solved_qs).length});
                this.setState({username:data.user.username});
                this.setState({solved_qs:JSON.parse(data.solved_qs)});
                //console.log("profile = ",this.state.profile);
                //console.log("user solved qs = ",this.state.solved_qs)
            })
            .catch(e => {console.log("Error occured in User Profile..")});
    }

    componentDidMount(){

        const isLoggedIn = this.isAuthenticated();

        if(isLoggedIn){

//            console.log("jwt token check = ",'JWT '+this.cookies.get('userJwtToken').token)
              console.log('local storage jwt token check = ','JWT '+ localStorage.getItem('userJwtToken'))

            fetch('/my_account/api/questions/',{
                 method: 'get',
                 headers: new Headers({
                 'Authorization': 'JWT '+ localStorage.getItem('userJwtToken'),
                 'Content-type': 'application/json'
                 }),
            })
            .then( results =>{
                return results.json();
            }).then(data=>{
                let questions = data.map(question=>{
                    return(
                            question
                    );
                })
                this.setState({
                    questions : questions
                })
                console.log("questions ==> ",this.state.questions)
            })
            .catch(e => {console.log("Error occured in fetching..")});
            this.getUserSolvedQuestions();
        }
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

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    getIcon(question_id){
//        const ids = this.state.questions.map(question =>{
//            return question.id
//        })
        //console.log("q_id = ",question_id)
        //console.log("user solved questions = ",this.state.solved_qs)
        if(this.state.solved_qs != undefined){

            if(this.state.solved_qs.includes(question_id)){
                return <DoneIcon/>
            }
            else{
                return <RemoveIcon/>
            }
        }
        return <RemoveIcon/>
    }

    handleSearch(search_val){
        //console.log("search = ",search_val);
        this.setState({search:search_val});
    }

    render(){
        const { classes } = this.props;
        const { questions, rowsPerPage, page , search} = this.state;
//        const emptyRows = rowsPerPage - Math.min(rowsPerPage, questions.length - page * rowsPerPage);

        //console.log("search string = ",this.state.search)

        let filtered_questions = questions.filter((question) =>{
            var str_question_id = String(question.id);
            var str_question_title = String(question.title).toLowerCase();
            //console.log("qid = ",temp.indexOf(Number(this.state.search)))
            return (str_question_id.indexOf(this.state.search) !== -1 ||
                    str_question_title.indexOf(this.state.search.toLowerCase()) !==-1
            );
        });

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, filtered_questions.length - page * rowsPerPage);

//        if(filtered_questions.length==0){
//            alert("Nothing matched your Result");
////            this.setState({search:""});
//        }

        const isLoggedIn = this.isAuthenticated();
        return(
         <div>
                {!isLoggedIn ? <Redirect to='/eulerprojectfe/login/'/> : (
                <div>
                <SearchBar
                        handleSearch = {this.handleSearch}
                        search = {this.state.search}
                />
                <Paper className={this.props.classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={this.props.classes.table}>
                      <TableHead style={{fontFamily:"Comic Sans MS"}}>
                        <TableRow>
                          <CustomTableCell numeric>ID</CustomTableCell>
                          <CustomTableCell >TITLE</CustomTableCell>
                          <CustomTableCell >STATUS</CustomTableCell>
                          <CustomTableCell numeric>SOLVED BY</CustomTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filtered_questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(question => {
                          return (
                            <TableRow key={question.id}>
                              <CustomTableCell component="th" scope="row">
                                {question.id}
                              </CustomTableCell>
                              <CustomTableCell >
                                    <Link to={`/eulerprojectfe/questions/view/${question.id}`}
                                          style={style_link}
                                    >
                                             {question.title}
                                    </Link>
                              </CustomTableCell>
                              <CustomTableCell numeric>{this.getIcon(question.id)}</CustomTableCell>
                              <CustomTableCell numeric>{question.difficulty}</CustomTableCell>
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 48 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                         )}
                      </TableBody>
                      <TableFooter>
                          <TableRow>
                            <TablePagination
                              colSpan={2}
                              count={questions.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={this.handleChangePage}
                              onChangeRowsPerPage={this.handleChangeRowsPerPage}
                              ActionsComponent={TablePaginationActionsWrapped}
                            />
                          </TableRow>
                      </TableFooter>
                    </Table>
                </div>
                </Paper>
                </div>
                )}
         </div>
        );
    }
}

Questions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const style_link = {
     textDecoration: 'none',
     color: "black",
     fontFamily: "Comic Sans MS",
};


export default withStyles(styles)(Questions);
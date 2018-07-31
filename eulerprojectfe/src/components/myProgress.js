import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Cookies from 'universal-cookie';

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

class MyProgress extends React.Component {

   constructor(props){
        super(props);
        this.state = {
            open: true,
            profile:"",
        };
        console.log("testing in dialog box")
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
                console.log("data = ",data);
                console.log("solved qs = ",data.solved_qs);
                if(data.solved_qs==''){
                    data.solved_qs = '[ ]';
                }
                 console.log("solved qs = ",data.solved_qs);
                console.log("parsed solved question obj = ",JSON.parse(data.solved_qs));
                this.setState({profile:data});
                this.setState({no_of_questions:JSON.parse(data.solved_qs).length});
                this.setState({username:data.user.username});
                this.setState({location:data.location});
                this.setState({bio:data.bio});
                this.setState({birth_date:data.birth_date});
                this.setState({email:data.user.email});
                this.setState({solved_qs:data.solved_qs});
                console.log("profile = ",this.state.profile);

            })
            .catch(e => {console.log("Error occured in fetching students..")});
    }

//  handleClickOpen = () => {
//    this.setState({ open: true });
//  };
//
//  handleClose = () => {
//    this.setState({ open: false });
//  };
//
//   setOpen(){
//        this.setState({ open: true });
//   }
//
//    unsetOpen(){
//        this.setState({ open: false });
//    }

  render() {
    //console.log('profile = ',this.state.username)
    console.log("state of dialog = ",this.state.open)
    return (
      <div>
        <Dialog
          open={this.props.openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" style={{textAlign:"center"}}>
            {"Progress Card"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Hello {this.state.username}!!!
              <br/><br/>
              Your have solved  {this.state.no_of_questions} question(s) out of 21
              <br/><br/>
              Your solved questions - {this.state.solved_qs}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MyProgress;

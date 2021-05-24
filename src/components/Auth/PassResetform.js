import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../services/serverService';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import LoadingOverlay from 'react-loading-overlay';

const validPasswordRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
);


class PassResetform extends Component{


    state = { 
    email: localStorage.getItem('resetmail'),
     password : "Password",
     confirm_password : "Confirm password",
     passwordError:"fine",
     confirmError:"fine"
  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}

createSuccess = (info) => {
  NotificationManager.success( info, 'Success');
};

createNotification = (info) => {
  NotificationManager.error( info, 'Error');
};

validconfirm=()=>{

  if(this.state.password!=this.state.confirm_password){
    this.setState({confirmError:"passwords do not match"})
  }

  else{
    return true
  }

}

validpassword=()=>{

  if(!validPasswordRegex.test(this.state.password)){
    this.setState({passwordError:"Invalid password"})
  }

  else{
    return true
  }

}

passwordclean=()=>{
  this.setState({passwordError:"fine"})
}

confirmclean=()=>{
  this.setState({confirmError:"fine"})
}

handlesubmit = (event) => {

   if(
    this.state.passwordError!=='fine' ||
    this.state.confirmError!=='fine' 
  ){
    event.preventDefault();
    this.createNotification("Please Check your entered information")
  }

  else{

  this.setState({isLoading: true});

    const data={
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirm_password,

      }
  
    //  console.log( JSON.stringify(this.state));                 
    event.preventDefault();
  
    console.log(data);
  
//   axios.post('https://776d58591d10.ngrok.io/auth/forgot-password/new-password/', data)
  ServerService.passresetform(data)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {
      localStorage.setItem("refresh_token",resp.data.refresh)
      localStorage.setItem("access_token",resp.data.access)
      this.setState({isLoading: false});
      this.setState({ redirect: "/" });
    }
  
  })
  .catch(error => {
    console.log(error.response)
    this.setState({isLoading: false});
    if(error.response.data.message){
      this.createNotification(error.response.data.message)
    }

  })

}

}
 

render(){

  if(this.state.redirect){
    return <Redirect to= {this.state.redirect} />
  }

 return(

  <LoadingOverlay
  active={this.state.isLoading}
  spinner
  text='Loading...'
  >

  <div className={classes.signup}>
    <div className={classes.imgbox}>

    </div>
    <div className={classes.formup}>
   <form onSubmit = {this.handlesubmit} >
   <h1 className={classes.headline}>Reset Password</h1>

   <label className={classes.labelfield}> Password </label><br />
    <input  type="password" name="password" className={classes.field} required placeholder= {this.state.password} 
    onChange={this.handlechangeall} onBlur={this.validpassword} onFocus={this.passwordclean}/> <br/>
    <p className={(this.state.passwordError==="fine")? classes.invisible: classes.visible}>{this.state.passwordError}</p>

    <label className={classes.labelfield}> Confirm Password </label><br />
    <input  type="password" name="confirm_password" className={classes.field} required placeholder= {this.state.confirm_password} 
    onChange={this.handlechangeall}  onBlur={this.validconfirm} onFocus={this.confirmclean}/> <br/>
    <p className={(this.state.confirmError==="fine")? classes.invisible: classes.visible}>{this.state.confirmError}</p>

    <input type="submit" value="Submit" className={classes.sub}/>
   </form>
   </div>
  </div>
  </LoadingOverlay>
 )
}

}

export default PassResetform;
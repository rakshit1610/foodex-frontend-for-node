import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../services/serverService'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import LoadingOverlay from 'react-loading-overlay';

const validEmailRegex = RegExp(
  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
);

const validPasswordRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
);


class Login extends Component{


  state = { 
    email: "Email",
    password : "Password",
    emailError: "fine",
    passwordError : "fine",
    redirect:null,
    isLoading: false
  }


handlechangeall = (event) =>{
 this.setState ( { [event.target.name] :event.target.value  } )
}

createNotification = (info) => {

  NotificationManager.error( info, 'Error');


};

validemail=()=>{

  if(!validEmailRegex.test(this.state.email)){
    this.setState({emailError:"Invalid email"})
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


emailclean=()=>{
  this.setState({emailError:"fine"})
}

passwordclean=()=>{
  this.setState({passwordError:"fine"})
}

handlesubmit = (event) => {

  if(
    this.state.emailError!=='fine' ||
    this.state.passwordError!=='fine'
  ){
    event.preventDefault();
    this.createNotification("Please Check your entered information")
  }

  else{
  this.setState({ isLoading: true });

const data={
  email: this.state.email,
  password: this.state.password

}
  event.preventDefault();
  ServerService.login(data)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {
      localStorage.setItem("refresh_token",resp.data.refresh)
      localStorage.setItem("access_token",resp.data.access)
      localStorage.setItem("userId",resp.data.userId)
      this.setState({isLoading: false});
      this.setState({ redirect: "/" });
    }
  
  })
  .catch(err => {
    console.log(err.response)
    this.setState({isLoading: false});
    if(err.response.data.detail){
    this.createNotification("Invalid credentials. Please check your email and password")
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
    <h1 className={classes.headline}>SIGN-IN</h1>
    <label className={classes.labelfield}> Email </label><br />
    <input  type="email" name="email" className={classes.field} required placeholder= {this.state.email} 
    onChange={this.handlechangeall} onBlur={this.validemail} onFocus={this.emailclean}/> <br/>
    <p  className={(this.state.emailError==="fine")? classes.invisible: classes.visible}>{this.state.emailError}</p>

    <label className={classes.labelfield}> Password </label><br />
    <input  type="password" name="password" className={classes.field} required placeholder= {this.state.password} 
    onChange={this.handlechangeall} onBlur={this.validpassword} onFocus={this.passwordclean}/> <br/>
    <p className={(this.state.passwordError==="fine")? classes.invisible: classes.visible}>{this.state.passwordError}</p>

    <input type="submit" value="Submit" className={classes.sub} /><br/>
    {/* <p ><Link to='/sign-up'>click to signup </Link></p> */}
    <div className={classes.wraplinks}>
    <span className={classes.linkwrap}><Link to='/forgot-password' className={classes.linkswitch1}>Forgot Password? </Link></span>
    <span className={classes.linkwrap}><Link to='/sign-up' className={classes.linkswitch2}>Sign up </Link></span>
    </div>
    </form>
   </div>
  </div>
  </LoadingOverlay>
 )
}

}

export default Login;
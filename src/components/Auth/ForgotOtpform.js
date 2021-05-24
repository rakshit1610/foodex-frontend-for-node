import React, { Component } from 'react';
import classes from './Signform.module.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../services/serverService'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import LoadingOverlay from 'react-loading-overlay';

class ForgotOtpform extends Component{


  state = { 
      email: localStorage.getItem('resetmail'),
    otp:"otp",
    ageError:"fine"
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


handlesubmit = (event) => {

 
  this.setState({isLoading: true});

  // console.log( JSON.stringify(this.state));
const data={
    email:this.state.email,
  otp: this.state.otp
}
  event.preventDefault();
//   ServerService.login(data)
console.log(data)
// axios.post('https://776d58591d10.ngrok.io/auth/forgot-password/otp/',data)
ServerService.forgototp(data)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {
      this.setState({isLoading: false});
      this.setState({ redirect: "/change-password" });
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


resend = (event) => {
  
  const resenddata={
    email: this.state.email
  }
                
    event.preventDefault();
  console.log(resenddata)
    // axios.post('https://776d58591d10.ngrok.io/auth/register/otp/resend/',resenddata)
    ServerService.resendotp(resenddata)
    .then((resp)=>{
      console.log(resp)
  
      if (resp.status === 200) {
        console.log(resp)
        this.createSuccess("OTP sent again")
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
   <h1 className={classes.headline}>Verify Email</h1>
   <label className={classes.labelfield}> OTP </label><br />
    <input  type="number" className={classes.field} name="otp" required placeholder={this.state.age}  
    onChange={this.handlechangeall} onBlur={this.validage} onFocus={this.ageclean}/> <br/>
    <p className={(this.state.ageError==="fine")? classes.invisible: classes.visible}>{this.state.ageError}</p>
    <input type="submit" value="Submit" className={classes.sub} /><br/>
    <p className={classes.reotp} onClick={this.resend}><Link className={classes.linkswitch1}> Resend OTP </Link></p>

   </form>
   </div>
  </div>
  </LoadingOverlay>
 )
}

}

export default ForgotOtpform;
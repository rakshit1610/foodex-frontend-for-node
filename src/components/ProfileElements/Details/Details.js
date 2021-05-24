import React, {Component} from 'react';
import classes from './Details.module.css';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../../services/serverService';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import { storage } from "../../../firebase/index"; //for firebase image storage



class Details extends Component {


    state={
        userdetails:[],
        profileimg:"",
        redirect: null
    }

    createSuccess = (info) => {
        NotificationManager.success( info, 'Success');
    };

    handleimg=(e)=>{


        // this.setState({profileimg:})

        // const data={
        // img: this.state.profileimg
        // }

        const userid= localStorage.getItem('userId')

        const file=e.target.files[0];
        


        const uploadFirebase = storage.ref(`images/${file.name}`).put(file);

        uploadFirebase.on(
          "state_changed",
          snapshot => {},
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                console.log(url)

                const data={
                    userimage: url
                }
      
            ServerService.profilepicture(data, userid)
            .then((resp)=>{
            console.log(resp)
            if(resp.status===200){
                this.createSuccess("Profile Picture changed successfully")
                this.setState({redirect:'/'})
            }
       
          })
                
            
              })
              .catch(err => {console.log(err.response)})
      
              });
      


    }


    componentDidMount(){

        const data= localStorage.getItem('userId');

        console.log(data)

        ServerService.userdetails(data)
        .then((resp)=>{
                console.log(resp)    
                this.setState({userdetails: resp.data})
              })
    }


render(){    

    if(this.state.redirect){
        return <Redirect to={this.state.redirect} />
    }

    return (
      <>
<div className={classes.totalwrap}>
<div className={classes.bookmarks}>
<button className={classes.bookmarkbtn}> <Link to='/bookmarks' className={classes.bookbtn}><i className="fa fa-bookmark" aria-hidden="true"></i></Link>
<Link className={classes.savetext} to="/bookmarks"><span >My Bookmarks</span></Link></button>
</div>
<div className={classes.cover}>
<div className={classes.wrapper}>
<div className={classes.dp}>
<img src={this.state.userdetails.image_user}/>
<input className={classes.avatar} id="uploadpic" type="file" className={classes.avatar} onChange={this.handleimg} name="file" accept="image/*" />
<label className={classes.change} htmlFor="uploadpic">Change Picture</label>
</div>
<h3> 
    {this.state.userdetails.name}
</h3>
</div>

<div className={classes.options}>
     <Link to="/following" className={classes.profilenums}><div>
        <h5 className={classes.headingnums}>Following</h5>
        <p className={classes.nums}>{this.state.userdetails.following}</p>
        </div>
        </Link>
    
    <Link to="/followers"  className={classes.profilenums}><div>
        <h5 className={classes.headingnums}>Followers</h5>
        <p className={classes.nums}>{this.state.userdetails.follower}</p>     
    </div>
    </Link>
    <Link className={classes.profilenums} to="/profile"><div>
        <h5 className={classes.headingnums}>Posts</h5>
        <p className={classes.nums}>{this.state.userdetails.post_count}</p>
    </div></Link>

</div>

</div>
</div>


</>
  );
}
}


export default Details;
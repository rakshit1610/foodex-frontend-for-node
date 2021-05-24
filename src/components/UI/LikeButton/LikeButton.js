import React, {Component} from 'react';
import classes from './LikeButton.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../../services/serverService';

class LikeButton extends Component {

    state = {
        // likes: 0,
        isclicked: false,
        likes: 0
    };


    componentDidMount(){

        const data= {
            pk: this.props.pk,
            readerpk: localStorage.getItem('userId')
        }

        console.log("likebntn call");
        console.log(data);



      ServerService.readrecipe(data)
      .then(response=>{
        console.log(response);
        this.setState({isclicked: response.data.like_is, likes: response.data.points})
      })
    }

    addLike = () => {
 
        if(this.state.isclicked){
            this.setState({likes: this.state.likes-1})
        }
        else{
            this.setState({likes: this.state.likes+1})
        }

          this.setState({
          isclicked: ((this.state.isclicked)?false:true)
        });

        const data={
            recipeId: this.props.pk,
            userId: localStorage.getItem('userId')
        }
        // console.log(data)

        ServerService.like(data)
        .then((resp)=>{
            console.log(resp)          
          })
        
    };

    render() {

        if(!localStorage.getItem('access_token')){
            return (
            
               <Link to='/sign-in'><button onClick={this.addLike} className={classes.likebtn} > 
               <i className="far fa-heart"></i> {this.state.likes}
               </button>

</Link> 
            )
        }


        if(this.state.isclicked){
            return (
            
                <button onClick={this.addLike} className={classes.likebtn} >
                    <i className="fa fa-heart" aria-hidden="true"></i> {this.state.likes}
                </button>
            )
        }

        else{
            return (
            
                <button onClick={this.addLike} className={classes.likebtn} > 
                <i className="far fa-heart"></i> {this.state.likes}
                </button>
            )
        }
        
    }
}

export default LikeButton;
import React, {Component} from 'react';
import classes from './BookmarkButton.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../../services/serverService';


class BookmarkButton extends Component {

    state = {
        isclicked: false
    };

    componentDidMount(){
        const data= {
            recipeId: this.props.pk,
            userId: localStorage.getItem('userId')
        }

      ServerService.bookmarkcheck(data)
      .then(response=>{
        console.log(response);
        this.setState({isclicked: response.data.bookmark_is,})
      })
    }

    handlechange = () => {
          this.setState({
          isclicked: ((this.state.isclicked)?false:true)
        });

        const data={
            recipeId: this.props.pk,
            userId: localStorage.getItem('userId')
        }
        // console.log(data)

        // axios.post('https://776d58591d10.ngrok.io/recipe/bookmark/', data,
        // {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        //     },
            
        // }) 
        ServerService.bookmark(data)
        .then((resp)=>{
            console.log(resp)          
          })
        
    };

    render() {

        if(!localStorage.getItem('access_token')){
            return (
            
               <Link to='/sign-in'><button className={classes.bookmarkbtn} > 
               <i className="far fa-bookmark"></i>
               </button>

</Link> 
            )
        }



        if(this.state.isclicked){
            return (
            
                <button onClick={this.handlechange} className={classes.bookmarkbtn} >
                    <i className="fa fa-bookmark" aria-hidden="true"></i>
                </button>
            )
        }

        else{
            return (
            
                <button onClick={this.handlechange} className={classes.bookmarkbtn} > 
                <i className="far fa-bookmark"></i>
                </button>
            )
        }
        
    }
}

export default BookmarkButton;
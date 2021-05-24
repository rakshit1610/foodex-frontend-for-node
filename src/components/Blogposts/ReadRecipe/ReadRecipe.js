import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from './ReadRecipe.module.css';
import {Link, Redirect} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';
import LikeButton from '../../UI/LikeButton/LikeButton';
import BookmarkButton from '../../UI/BookmarkButton/BookmarkButton';
import axios from 'axios';
import serverService from '../../../services/serverService';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Loader from 'react-loader-spinner'


class AddRecipe extends Component {

  createSuccess = (info) => {
    NotificationManager.success( info, 'Success');
  };


    state = {
        isLoading: true,
        recipe: [],
        error: null,
        redirect: null,
        suggestion:""
        // text: '  or kadhai, heat a tablespoon of butter and a tablespoon of oil'
        
      }

      handlechangeall = (event) =>{
        this.setState ( { [event.target.name] :event.target.value  } )
       }

      handlesuggestion=()=>{

        this.setState({isLoading:true})

        const data={
          recipename: this.state.recipe.title,
          suggestion:  this.state.suggestion,
          readerpk: localStorage.getItem('userId'),
          ownerpk: this.state.recipe.ownerId
        }
        console.log(data)
        serverService.suggestions(data)
      .then((resp)=>{
        console.log(resp)
        if (resp.status === 200) {
        this.createSuccess("Suggestion Sent!")
        this.setState({isLoading:false})
        // this.setState({redirect:'/'})

    }
        }
      
      )
      }


    
      componentDidMount(){
          const data= {
            pk: this.props.location.state.recipeid,
            readerpk: localStorage.getItem('userId')
          }
          
          

        console.log(data)

        serverService.readrecipe(data)
        .then(response=>{
          console.log(response);
          this.setState({recipe: response.data, isLoading:false})
        })
      }

      deletehandler=()=>{
        const data={
        deletepk: this.props.location.state.recipeid,
        readerpk: localStorage.getItem('userId')
        }

        serverService.deletepost(data)
        .then(response=>{
          console.log(response);
          if(response.status===200){
            this.createSuccess("Recipe Deleted")
          this.setState({redirect: '/profile'})
          }
        })

      }


    render(){

      
      if(this.state.isLoading){
        return  (
          <>
        <NavigationBar />     
        <Loader
        type="TailSpin"
        color="#ff1742"
        height={100}
        width={100}
        className={classes.spinner}
     />
     </>
     );
      }

      else{

        if(this.state.redirect){
          return <Redirect to={this.state.redirect} />
        }

        let editing
        let deleting
        let authorprofile
      if(this.state.recipe.ownit){
        editing= <Button className={classes.editbtn} as={Link} 
           to= {{
            pathname:'/edit-recipe',
            state:{recipeid: this.props.location.state.recipeid}
          }} 
          >Edit</Button>

          deleting= <button onClick={this.deletehandler} className={classes.deletebtn}>delete</button>

          authorprofile= <Link className={classes.authorname}
                to= 'profile'
                >{this.state.recipe.owner}
                </Link>
      }
      else{
        editing= <Button className={classes.btnhide} as={Link} 
        to= {{
         pathname:'/edit-recipe',
         state:{recipeid: this.props.location.state.recipeid}
       }} 
       >Edit</Button>

       deleting= <button className={classes.btnhide}>delete</button>

       authorprofile= <Link className={classes.authorname}
                to= {{
                    pathname:'/user-profile',
                    state:{ownerpk: this.state.recipe.ownerId}
                  }} 
                >{this.state.recipe.owner}
                </Link>

      }

        return (
            <>
                <NavigationBar />
                <div className= {classes.outerwrap}>
                <div className={classes.readrecipe}>
                  {(this.state.recipe.category==='main_course')?<span className={classes.tags}>Main Course</span>: null}
                  {(this.state.recipe.category==='starter')?<span className={classes.tags}>Starters</span>: null}
                  {(this.state.recipe.category==='drink')?<span className={classes.tags}>Drinks and Smoothies</span>: null}
                  {(this.state.recipe.category==='others')?<span className={classes.tags}>Others</span>: null}
                  {(this.state.recipe.category==='desserts')?<span className={classes.tags}>Desserts</span>: null}

                    {this.state.recipe.veg? <span className={classes.tags}>Vegetarian</span>:<span className={classes.tags}>Non-Vegetarian</span>}
                    {/* <span className={classes.tags}>Vegetarian</span> */}
                <h1 className={classes.titlerecipe}>{this.state.recipe.title}</h1>
                {/* <h1>Butter Paneer</h1> */}
                <div className={classes.options}>
                <span className={classes.by}> by
                {/* <Link className={classes.authorname}
                to= {{
                    pathname:'/user-profile',
                    state:{ownerpk: this.state.recipe.ownerkapk}
                  }} 
                >{this.state.recipe.owner}
                </Link> */} {authorprofile}
                </span>
        <p className={classes.extras}>Cooking Time: {this.state.recipe.cook_time} mins</p>
                </div>
                <div className={classes.imgwrap}>
                <img  className={classes.foodimg} 
                src={this.state.recipe.img}
                // src="https://www.cookwithmanali.com/wp-content/uploads/2019/05/Paneer-Butter-Masala-500x500.jpg" 
                
                />
                </div>
                <h2 className={classes.foodhead}>Ingredients</h2>
                <h5 className={classes.ingredients}>
                    {/* Tomato, Onion, Paneer, Pickle, Garlic, Butter, Masala, Cashews, Pickle, Ginger, Wheat. */}
                    {this.state.recipe.ingredients}
                </h5>
                <h2 className={classes.foodhead}>Instructions</h2>
                <h5 className={classes.recipe}>
                {/* or kadhai, heat a tablespoon of butter and a tablespoon of oil.
                Add red chillies, ginger, garlic paste and all the whole spices (bay leaves, cinnamon, cloves, cardamom and peppercorns). Alternatively, you can also wrap the spices in a muslin cloth and add them to the pan (take this out after the tomatoes are cooked down). Saute for a minute or two and add cashew nuts, poppy seeds (if using) and onions. Once the onions turn translucent, add the tomatoes. Mix well */}
              
            {/* {this.state.text} */}

                {this.state.recipe.content}
                </h5>

<div className={classes.btnwrap}>
                <div className={classes.btndivfirst}>
                <LikeButton 
                pk={this.props.location.state.recipeid} 
                likeis= {this.state.recipe.like_is} 
                points= {this.state.recipe.points} 
                />
                <BookmarkButton 
                pk={this.props.location.state.recipeid} 
                />

                </div>
                <div className={classes.btndivsecond}>     
                           
                    {/* <Button className={classes.editbtn} as={Link} 
           to= {{
            pathname:'/edit-recipe',
            state:{recipeid: this.props.location.state.recipeid}
          }} 
          >Edit</Button> */}  {editing}

                {/* <button className={classes.deletebtn}>delete</button> */} {deleting}
                </div>

</div>

                <h2 className={classes.suggest}>Drop a Suggestion<i className="far fa-sticky-note"></i></h2>
                <textarea rows="10" className={classes.area} name = 'suggestion' onChange = {this.handlechangeall} />
                {(localStorage.getItem('access_token'))? <input className={classes.suggestionbtn} type="submit" 
                onClick={this.handlesuggestion} value="SUBMIT SUGGESTION" /> : 
                <Link to='/sign-in'><input className={classes.suggestionbtn} type="submit" 
                value="SUBMIT SUGGESTION" /></Link>
                }
                
                </div>
                <div className={classes.tips}>
                <Card style={{ width: '18rem' }} className={classes.tipscard}>
                <Card.Header className={classes.tiphead}><i className="fa fa-bullhorn"> </i> Q U I C K - T I P S</Card.Header>
                <Card.Body className={classes.bulletpoints}>
                {/* <Card.Text> */}
                <ul>
                <li>Like a recipe to show your support</li>
                <li>Bookmark a recipe for reading it later</li>
                <li>Follow the author to keep in touch</li>
                <li>Drop a suggestion (if any) for the author to improve in future</li>
                <li>Become an active member to get recognized</li>
                </ul>
                {/* </Card.Text> */}
                </Card.Body>
                </Card>
                </div>
                </div>
            </>
        );
      }
    }
}

export default AddRecipe;










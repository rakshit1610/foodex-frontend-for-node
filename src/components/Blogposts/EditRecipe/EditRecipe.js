import React, {Component} from 'react';
import NavigationBar from '../../Navbar/Navbar';
import classes from '../AddRecipe/AddRecipe.module.css';
import {Link, Redirect} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap'
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import serverService from '../../../services/serverService'
import LoadingOverlay from 'react-loading-overlay';

import { storage } from "../../../firebase/index"; //for firebase image storage


class EditRecipe extends Component {

    state = { 
    title:"",
    titleLimit:50,
    ingredients:"",
    ingredientsLimit: 300,
    content:"",
    recipe:[],
    img: null,
    oldimg: null,
    contentLimit:4000,
    category:"starters",
    veg:true,
    cook_time: "",
    isLoading:false

  }

  createNotification = (info) => {
    NotificationManager.error( info, 'Error');
};

  componentDidMount(){
    const data= {
      pk: this.props.location.state.recipeid,
      readerpk: localStorage.getItem('userId')
    }

  console.log(data)
  serverService.readrecipe(data)
  .then(response=>{
    console.log(response);
    this.setState({recipe: response.data})
    this.setState({title: response.data.title, ingredients: response.data.ingredients, content: response.data.content,
    veg: response.data.veg, cook_time: response.data.cook_time, category: response.data.category, img: response.data.img, 
    oldimg: response.data.img
    })

  })
}


    handlechangeall = (event) =>{
        this.setState ( { [event.target.name] :event.target.value  } )
    }   

    handleimg=(e)=>{

        this.setState({img:e.target.files[0]})

    }
    
    createSuccess = (info) => {
        NotificationManager.success( info, 'Success');
    };

    handlesubmit = (event) => {

 

        event.preventDefault();

        if(this.state.title.length - this.state.titleLimit>0 ||
          this.state.content.length - this.state.contentLimit>0 ||
          this.state.ingredients.length - this.state.ingredientsLimit>0 ||
          this.state.title.length==0 || this.state.content.length==0 || this.state.ingredients.length==0
          ){
            this.createNotification("Please ensure you have filled all the fields within character limit")
            this.createNotification("Instructions should be at least 250 characters long")
        }

        
else if(this.state.content.length<160){
  this.createNotification("Instructions should be at least 160 characters long")
}

else{


  if(this.state.oldimg!==this.state.img){
    this.setState({isLoading: true});
console.log("img bdli")
  const uploadFirebase = storage.ref(`images/${this.state.img.name}`).put(this.state.img);

  uploadFirebase.on(
    "state_changed",
    snapshot => {},
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(this.state.img.name)
        .getDownloadURL()
        .then(url => {
          console.log(url)
          this.setState({img:url})


          const data={
            title: this.state.title,
            category: this.state.category,
            ingredients: this.state.ingredients,
            recipeId: this.props.location.state.recipeid,
            content: this.state.content,
            veg: this.state.veg,
            cook_time: this.state.cook_time,
            ownerId: this.state.ownerId,
            img: url
          }

          console.log(data)

          serverService.editrecipe(data)
        .then((resp)=>{
          console.log(resp)
          if(resp.status===200){
            this.createSuccess("Recipe Posted!")
            this.setState({ isLoading:false, redirect: "/profile"});
          }
      
        })
        .catch(err => {console.log(err.response)})

        });

    }
  );
  }

  else{
    this.setState({isLoading: true});
    console.log("img nhi bdli")

    const data={
      title: this.state.title,
      category: this.state.category,
      ingredients: this.state.ingredients,
      recipeId: this.props.location.state.recipeid,
      content: this.state.content,
      veg: this.state.veg,
      cook_time: this.state.cook_time,
      ownerId: this.state.ownerId,
      img: this.state.oldimg
    }

    console.log(data)

    serverService.editrecipe(data)
  .then((resp)=>{
    console.log(resp)
    if(resp.status===200){
      this.createSuccess("Recipe Posted!")
      this.setState({ isLoading:false, redirect: "/profile"});
    }

  })
  .catch(err => {console.log(err.response)})
  }
  
        
}

      //   else{

      //     this.setState({isLoading:true });

      //     let data=[]
      //     if(this.state.img===null){
      //       data={
      //         title: this.state.title,
      //         recipeId: this.props.location.state.recipeid,
      //         category: this.state.category,
      //         ingredients: this.state.ingredients,
      //         content: this.state.content,
      //         veg: this.state.veg,
      //         cook_time: this.state.cook_time,
      //         owner: this.state.owner,
      //       }
  
      //     }

      //     else{
      //       data={
      //         title: this.state.title,
      //         recipeId: this.props.location.state.recipeid,
      //         category: this.state.category,
      //         ingredients: this.state.ingredients,
      //         content: this.state.content,
      //         veg: this.state.veg,
      //         cook_time: this.state.cook_time,
      //         owner: this.state.owner,
      //         img: this.state.img
      //       }
  
      //     }


      
        
      //     const formdata = new FormData();
      //     for (let formElement in data) {
      //       formdata.append(formElement, data[formElement]);
      //       // console.log(formElement, data[formElement]);
      //     }
      
      //     console.log(formdata)
      //         // axios.post('http://58eaa649e23e.ngrok.io/recipe/post/'+ userpk +'/', formdata)
      //         // axios.post('https://f301cd771e23.ngrok.io/recipe/post/', formdata)
      //         serverService.editrecipe(formdata)
      //         .then((resp)=>{
      //           console.log(resp)
      //           if(resp.status===200){
      //             this.createSuccess("Recipe Posted!")
      //             this.setState({ isLoading:false, redirect: "/profile"});
      //             // this.setState({ redirect: "/profile"});
      //           }
            
      //         })
      //         .catch(err => {console.log(err.response)})
      // }
          
            }

    render(){

        if(this.state.redirect){
            return <Redirect to= {this.state.redirect} />
          }

        return (
          <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text='Loading...'
          >
                <NavigationBar />
                <div className= {classes.outerwrap}>
                <div className={classes.addrecipe}>
                <h1>Edit Your Recipe</h1>
                
                

        <form onSubmit = {this.handleOnSubmit}>

            <label className={classes.labels}><h3 >Recipe Title</h3></label>
            <input type="text" className={classes.area} name = 'title'  value={this.state.title} onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.title.length}/{this.state.titleLimit}</p>
            <label ><h3>Ingredients</h3></label>
            <textarea rows="5" className={classes.area} name = 'ingredients' value={this.state.ingredients}  onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.ingredients.length}/{this.state.ingredientsLimit}</p>
            <label ><h3>Instructions</h3></label>
            <textarea rows="10" className={classes.area} name = 'content' value={this.state.content} placeholder={this.state.instructions} onChange = {this.handlechangeall} />
            <p className={classes.limit}>{this.state.content.length}/{this.state.contentLimit}</p>
            <label><h3>Category</h3></label>
            <select name='category' value={this.state.category} className={classes.ddlist}  onChange={this.handlechangeall}>
            <option value="starter">Starters</option>
            <option value="main_course">Main Course</option>
            <option value="desserts">Desserts</option>
            <option value="drinks">Drinks and Smoothies</option>
            <option value="others">Others</option>
            </select>

            <label className={classes.labels}><h3>Tag</h3></label>
            <select name='veg' value={this.state.veg} className={classes.ddlist} onChange={this.handlechangeall}>
            <option value="true">Vegetarian</option>
            <option value="false">Non-Vegetarian</option>
            </select>

            <label className={classes.labels}><h3>Cooking Time:</h3></label>
            <input type="number" value={this.state.cook_time} className={classes.cooktime} name = 'cook_time' onChange = {this.handlechangeall} /> minutes
   
   <br />

            <label className={classes.labels}><h3>Upload Image:</h3></label>
            {/* <div className={classes.imgcontainer}> */}
            <input onChange={this.handleimg} className={classes.hidden} id="postimage" type="file" name="file" accept="image/*" />
            <label className={classes.imgbtn} htmlFor="postimage"><i className="fa fa-upload" aria-hidden="true"></i>Add Image</label>
            {/* </div> */}

            <input className={classes.submitrecipe} type="submit" onClick={this.handlesubmit} value="EDIT RECIPE" />

        </form>

                </div>
                <div className={classes.tips}>
                <Card style={{ width: '18rem' }} className={classes.tipscard}>
                <Card.Header className={classes.tiphead}><i className="fa fa-bullhorn"> </i> Q U I C K - T I P S</Card.Header>
                <Card.Body className={classes.bulletpoints}>
                <ul>
                <li>Write a good, catchy title</li>
                <li>Give clear details about your recipe preparation</li>
                <li>Add a relevant topic to reach the right members</li>
                <li>Check your spelling and grammar</li>
                <li>Become an active member to get recognized</li>
                </ul>
                </Card.Body>
                </Card>
                </div>
                </div>
            </LoadingOverlay>
        );
    }
}

export default EditRecipe;










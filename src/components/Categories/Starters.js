import React, { Component } from 'react';
import classes from './Categories.module.css';
import RecipeCard from '../UI/Card/RecipeCard'
import NavigationBar from '../Navbar/Navbar';
import axios from 'axios';
import ServerService from '../../services/serverService'
import Loader from 'react-loader-spinner'

class Starters extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

  componentDidMount(){
    // axios.get('http://af3c2d386213.ngrok.io/starters/')
    ServerService.starters()
    .then(response=>{
      // console.log(response.data);
      this.setState({recipecards: response.data, isLoading:false})
    })
  }

  render() {

    if(this.state.isLoading){
      return  (
        <>
        <NavigationBar />     
        <div className={classes.startersCover}>
            Starters
        </div>
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

    const recipecards= this.state.recipecards.map(recipecard=>{
    return <RecipeCard title={recipecard.title} img={recipecard.img} key={recipecard._id} pk={recipecard._id} readtime={recipecard.read_time} content={recipecard.content} />
    })

    return(
    <>
      <NavigationBar />     
        <div className={classes.startersCover}>
            Starters
        </div>

    <div className={classes.grid}>
    {recipecards}

    </div>
    </>
    )
  }
}
}


export default Starters;


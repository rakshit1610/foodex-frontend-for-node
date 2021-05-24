import React, { Component } from 'react';
import classes from './Home.module.css';
import Hero from '../../../Hero/Hero';
import RecipeCard from '../../../UI/Card/RecipeCard'
import NavigationBar from '../../Navbar';
import axios from 'axios';
import ServerService from '../../../../services/serverService'
import Footer from '../../../UI/Footer/Footer';
import Loader from 'react-loader-spinner'

class Home extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null
  }

  componentDidMount(){
    // axios.get('https://60bb5774f441.ngrok.io/')
    ServerService.homecards()
    .then(response=>{
      console.log(response);
      this.setState({recipecards: response.data, isLoading:false})
    })
  }

  render() {

    if(this.state.isLoading){
      return  (
        <>
        <NavigationBar />     
        <div>   
        <Hero />
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
    return <RecipeCard title={recipecard.title} img={recipecard.img} readtime={recipecard.read_time} key={recipecard.pk} pk={recipecard._id} content={recipecard.content} />
    })

    return(
    <>
      <NavigationBar />     
    <div>   
    <Hero />
    </div>
      <h1 className={classes.recentrecipes}>Recent Recipes</h1>
    <div className={classes.grid}>
    {recipecards}
      <Footer />
    </div>
    </>
    )
  }
}
}


export default Home;


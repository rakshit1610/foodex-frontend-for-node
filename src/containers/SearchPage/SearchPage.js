import React, { Component } from 'react';
import classes from './SearchPage.module.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import RecipeCard from '../../components/UI/Card/RecipeCard'
import SearchNavbar from '../../components/Navbar/SearchNavbar';
import axios from 'axios';
import ServerService from '../../services/serverService'
import {Form} from 'react-bootstrap'

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


class SearchPage extends Component {
  state = {
    isLoading: true,
    recipecards: [],
    error: null,
    newsearch:this.props.location.state.searchterm,
    data:"points-high-to-low",
    datatitle:"Points- high to low",
    veg:"true",
    vegtitle:"Vegetarian"
  }

  createNotification = (info) => {
    NotificationManager.error( info, 'Error');
  };

submitsort=(event)=>{


  const sortdata={
    search: this.state.newsearch,
    data: this.state.data,
    veg: this.state.veg
  }

console.log(sortdata)
  // axios.post('http://af3c2d386213.ngrok.io/search/sort/',sortdata)
  ServerService.sort(sortdata)
.then((resp)=>{
    console.log(resp);
    // const search_res=resp.data
    // console.log(search_res);
    if (resp.status === 200) {
        this.setState({recipecards: resp.data})
        console.log(this.state.recipecards)
    }
  
  })
}

handlechangeall = (event) =>{
  this.setState ( { [event.target.name] :event.target.value  } )
 }

 handleSelect=(e)=>{
  console.log(e);
  this.setState({veg: e})

  if(e==="true"){
    this.setState({vegtitle: "Vegetarian"})
  }
  else if(e==="false"){
    this.setState({vegtitle: "Non-Vegetarian"})
  }
  else{
    this.setState({vegtitle: "Both"})
  }

 }

 handleDataSelect=(e)=>{
  console.log(e);
  this.setState({data: e})

  if(e==="points-high-to-low"){
    this.setState({datatitle: "Points- high to low"})
  }
  else if(e==="points-low-to-high"){
    this.setState({datatitle: "Points- low to high"})
  }
  else if(e==="new"){
    this.setState({datatitle: "Newest"})
  }
  else{
    this.setState({datatitle: "Oldest"})
  }

 }

handlesubmit = (event) => {
  const data={
    search: this.state.newsearch,
    redirect:null 
  }

  console.log(data)
  // axios.post('https://b841ca4ed474.ngrok.io/search/',data)
  ServerService.searchpage(data)
  .then((resp)=>{
    console.log(resp);
    // const search_res=resp.data
    // console.log(search_res);
    if (resp.status === 200) {
        this.setState({recipecards: resp.data})
        console.log(this.state.recipecards)
    }

    if(!this.state.recipecards.length){
      this.createNotification("No recipes found")
    }
  
  })
}


  componentDidMount(){
    const data={
        search: this.props.location.state.searchterm,
        redirect:null 
      }

      console.log(data)
      // axios.post('https://b841ca4ed474.ngrok.io/search/',data)
      ServerService.searchpage(data)
      .then((resp)=>{
        console.log(resp);
        // const search_res=resp.data
        // console.log(search_res);
        if (resp.status === 200) {
            this.setState({recipecards: resp.data})
            console.log(this.state.recipecards)
        }
      
        if(!this.state.recipecards.length){
          this.createNotification("No recipes found")
        }

      })
  }


  render() {

    const recipecards= this.state.recipecards.map(recipecard=>{
    return <RecipeCard title={recipecard.title} readtime={recipecard.read_time} img={recipecard.img} pk={recipecard.pk} content={recipecard.content} />
    })

    return(
    <>
      {/* <NavigationBar />    */}
      <SearchNavbar />


      <div className={classes.sortwrap}>
      <DropdownButton
      RightAlign
      variant="Secondary"
      title={this.state.datatitle}
      className={classes.dropbtns}
      id="dropdown-menu-align-right"
      onSelect={this.handleDataSelect}
      >
              <Dropdown.Item className={classes.droplistopt} eventKey="points-high-to-low">Points- high to low</Dropdown.Item>
              <Dropdown.Item className={classes.droplistopt} eventKey="points-low-to-high">Points- low to high</Dropdown.Item>
              <Dropdown.Item className={classes.droplistopt} eventKey="new">Newest</Dropdown.Item>
              <Dropdown.Item className={classes.droplistopt} eventKey="old">Oldest</Dropdown.Item>

      </DropdownButton>

      <DropdownButton
      variant="Secondary"
      title={this.state.vegtitle}
      className={classes.dropsbtns}
      id="dropdown-menu-align-right"
      onSelect={this.handleSelect}
      >
              <Dropdown.Item
               className={classes.droplistopt} 
              eventKey="true">Vegetarian</Dropdown.Item>
              <Dropdown.Item
               className={classes.droplistopt} 
              eventKey="false">Non-Vegetarian</Dropdown.Item>
              <Dropdown.Item
               className={classes.droplistopt} 
              eventKey="all">Both</Dropdown.Item>

      </DropdownButton>


      {/* <button onClick={this.submitsort} className={classes.sortbtn}>Sort</button> */}
      <input onClick={this.submitsort} class="btn btn-primary sortingbtn" type="button" value="Sort"></input>
      </div>

<div className={classes.searchpagebar}>
       <input  type="text" name="newsearch" className={classes.sbar}
    onChange={this.handlechangeall} />
    <button className={classes.sbtn} onClick={this.handlesubmit} type="submit" value="SUBMIT" ><i class="fa fa-search" aria-hidden="true"></i></button>
    </div>

      <div className={classes.grid}>
      {recipecards}

      </div>
    </>
    )
  }
}


export default SearchPage;


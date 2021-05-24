import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classes from './Navbar.module.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';



class NavigationBar extends Component{

  state = { 
    search:"",
    redirect:null 
  }

  handlechangeall = (event) =>{
    this.setState ( { [event.target.name] :event.target.value  } )
  }

  handlesubmit=(event)=>{

    const data={
      search: this.state.search,

    }
    event.preventDefault();
    this.setState({ redirect: "/search-page" });

 
  
  }
  

  render() {

    if(this.state.redirect){
      return <Redirect to= {{
        pathname:this.state.redirect,
        state:{searchterm: this.state.search}
      }} />
    }

    let token= localStorage.getItem('refresh_token');
      let auth= true;
      if(token===null){
      auth=false;
      }

      const logoutHandler=()=>{
        localStorage.clear();
        auth= false;
      }

      if(auth){
        return(
          <Navbar bg="light" expand="lg" sticky="top" className={classes.navshadow}>
            <Link className={classes.brand} to="/">
              Foodex

            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="ml-auto"> 
                <FormControl type="text" name="search" onChange={this.handlechangeall} placeholder="Search" className={classes.sbar}
                // "mr-sm-2"
                />
                <Button onClick={this.handlesubmit} className={classes.sbtn} variant="outline-dark" ><i className="fa fa-search" aria-hidden="true"></i></Button>
              </Form>
              <Nav className="ml-auto" >
                <NavDropdown title="Categories" className={classes.navoption} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} className={classes.dditems} to="/starters">Starters</NavDropdown.Item>
                  <NavDropdown.Item as={Link} className={classes.dditems} to="/main-course">Main Course</NavDropdown.Item>
                  <NavDropdown.Item as={Link} className={classes.dditems} to="/desserts">Desserts</NavDropdown.Item>
                  <NavDropdown.Item as={Link} className={classes.dditems} to="/drinks-smoothies">Drinks and Smoothies</NavDropdown.Item>
                  <NavDropdown.Item as={Link} className={classes.dditems} to="/others">Others</NavDropdown.Item>

                </NavDropdown>
                <Nav.Link as={Link} className={classes.logopt} to="/add-recipe"><i className="fa fa-edit" aria-hidden="true"></i>Post</Nav.Link>
                <Nav.Link as={Link} className={classes.logopt} to="/profile"><i className="fa fa-user" aria-hidden="true"></i>My Profile</Nav.Link>
                <Nav.Link as={Link} className={classes.navoptions} to="/" onClick={logoutHandler}>Logout</Nav.Link>
              </Nav>
              
            </Navbar.Collapse>
          </Navbar>
        );
        
      }


      else{
      return(
<Navbar bg="light" expand="lg" sticky="top">
  <Link className={classes.brand} to="/">Foodex</Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Form inline className="ml-auto"> 
                <FormControl type="text" name="search" onChange={this.handlechangeall} placeholder="Search" className={classes.sbar}
                // "mr-sm-2"
                />
                <Button onClick={this.handlesubmit} className={classes.sbtn} variant="outline-dark" ><i class="fa fa-search" aria-hidden="true"></i></Button>
              </Form>
    <Nav className="ml-auto">
      <NavDropdown title="Categories" className={classes.navoption} id="basic-nav-dropdown">
      <NavDropdown.Item as={Link} className={classes.dditems} to="/starters">Starters</NavDropdown.Item>
      <NavDropdown.Item as={Link} className={classes.dditems} to="/main-course">Main Course</NavDropdown.Item>
      <NavDropdown.Item as={Link} className={classes.dditems} to="/desserts">Desserts</NavDropdown.Item>
      <NavDropdown.Item as={Link} className={classes.dditems} to="/drinks-smoothies">Drinks and Smoothies</NavDropdown.Item>
      <NavDropdown.Item as={Link} className={classes.dditems} to="/others">Others</NavDropdown.Item>

      </NavDropdown>
      <Nav.Link as={Link} className={classes.navoptions} to="/sign-in">Sign In</Nav.Link>
      <Nav.Link as={Link} className={classes.navoptions} to="/sign-up">Sign Up</Nav.Link>
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
      );
}

  }
}



export default NavigationBar;

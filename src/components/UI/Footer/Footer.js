import React from 'react';
import {Link} from 'react-router-dom'
import classes from './Footer.module.css'


const Footer = () => {
 return(
 
<footer className={classes.footerdistributed}>

<div className={classes.footerleft}>

    <h3>Foodex</h3>

    <p className={classes.footerlinks}>
        {/* <a href="#" className={classes.link1}>Home</a> */}
        
        <Link to="/starters" className={classes.categoryroutes}>Starters</Link>
    
        <Link to="/main-course" className={classes.categoryroutes}>Main Course</Link>
    
        <Link to="/desserts" className={classes.categoryroutes}>Desserts</Link>
        
        <Link to="/drinks-smoothies" className={classes.categoryroutes}>Drinks</Link>
        
        <Link to="/others" className={classes.link1}>Others</Link>
    </p>

    <p className={classes.footercompanyname}>Foodex © 2020</p>
</div>

<div className={classes.footercenter}>
<p className={classes.contacttext}>Contact</p><br/>

    <div> 
        <i className="fa fa-map-marker"></i>
        <p><span>Ajay Kumar Garg Engineering College</span>Ghaziabad</p>
    </div>

    <div>
        <i className="fa fa-envelope"></i>
        <p><span>support@foodex.com</span></p>
    </div>

</div>

<div className={classes.footerright}>

    <p className={classes.footercompanyabout}>
        <span>About Us</span>
        Foodex is a blogging platform where users can share their own recipes and read the recipes posted by others.
    </p>

    {/* <div className={classes.footericons}>

        <a href="#"><i className="fab fa-facebook-square"></i></a>
        <a href="#"><i className="fab fa-twitter-square"></i></a>
        <a href="#"><i className="fab fa-instagram-square"></i></a>
        <a href="#"><i className="fab fa-github-square"></i></a>

    </div> */}

</div>

</footer>


)
};



export default Footer;


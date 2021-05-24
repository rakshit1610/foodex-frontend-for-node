import React from 'react';
import {Link} from 'react-router-dom'
import classes from './UserProfileBanner.module.css'


const UserProfileBanner = () => {
 return(
    <div className={classes.totalwrap}>
    <div className={classes.bookmarks}>
    <button className={classes.bookmarkbtn}> <i className="fa fa-bookmark" aria-hidden="true"></i>
    <span className={classes.savetext}>My Bookmarks</span></button>
    </div>
    <div className={classes.cover}>
    <div className={classes.wrapper}>
    <div className={classes.dp}>
    <img  src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/>
    <input className={classes.avatar} id="uploadpic" type="file" className={classes.avatar} onChange={(e)=>this.upload(e)} name="img" accept="image/*" />
    <label className={classes.change} for="uploadpic">Change Picture</label>
    </div>
    <h3>Sheela Kumari</h3>
    {/* <p className={classes.bookmark}>my bookmarks</p> */}
    </div>

    <div className={classes.options}>
        <div>
            <h5>Following</h5>
            <p className={classes.nums}>34</p>
        </div>
        <div>
            <h5>Followers</h5>
            <p className={classes.nums}>34</p>
        </div>
        <div>
            <h5>Posts</h5>
            <p className={classes.nums}>34</p>
        </div>

    </div>

    </div>
    </div>

    
)
};



export default UserProfileBanner;
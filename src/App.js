import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './components/Navbar/pages/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './components/Navbar/pages/LogIn';
import SignUp from './components/Navbar/pages/SignUp';
import Otp from './components/Navbar/pages/Otp';
import AddRecipe from './components/Blogposts/AddRecipe/AddRecipe'
import EditRecipe from './components/Blogposts/EditRecipe/EditRecipe'
import ReadRecipe from './components/Blogposts/ReadRecipe/ReadRecipe'
import Starters from './components/Categories/Starters'
import MainCourse from './components/Categories/MainCourse'
import Drinks from './components/Categories/Drinks'
import Desserts from './components/Categories/Desserts'
import Others from './components/Categories/Others'
import SearchPage from './containers/SearchPage/SearchPage';
import ForgotPassword from './components/Navbar/pages/ForgotPass/ForgotPassword';
import ForgotOtp from './components/Navbar/pages/ForgotPass/ForgotOtp';
import PasswordReset from './components/Navbar/pages/ForgotPass/PasswordReset';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import FollowersList from './components/ProfileElements/FollowersList/FollowersList';
import MyRecipes from './components/ProfileElements/MyRecipes/MyRecipes';
import Bookmarks from './components/ProfileElements/Bookmarks/Bookmarks';
import FollowingList from './components/ProfileElements/FollowingList/FollowingList';
import OtherUser from './components/ProfileElements/OtherUser/OtherUser'

import Protected from './services/Protected'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={LogIn} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/forgot-otp' component={ForgotOtp} />
        <Route path='/change-password' component={PasswordReset} />
        <Protected path='/profile' component={MyRecipes} />
        <Route path='/user-profile' component={OtherUser} />
        <Protected path='/bookmarks' component={Bookmarks} />
        <Route path='/otp' component={Otp} />
        <Protected path='/add-recipe' component={AddRecipe} />
        <Route path='/edit-recipe' component={EditRecipe} />
        <Route path='/read-recipe' component={ReadRecipe} />
        <Route path='/starters' component={Starters} />
        <Route path='/drinks-smoothies' component={Drinks} />
        <Route path='/desserts' component={Desserts} />
        <Route path='/main-course' component={MainCourse} />
        <Route path='/others' component={Others} />
        <Route path='/search-page' component={SearchPage} />
        <Protected path='/followers' component={FollowersList} />
        <Protected path='/following' component={FollowingList} />

      </Switch>
      <NotificationContainer />
    </Router>


    
  );
}

export default App;




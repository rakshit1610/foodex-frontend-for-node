import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import classes from './RecipeCard.module.css'


const RecipeCard = (props) => {
 return(
      <Card style={{ width: "18rem" }} className={classes.box} index={props.pk}>
        <Card.Img variant="top" height="250px" src= {props.img} />
        <Card.Body>
          <Card.Title className={classes.blogtitle}>{props.title}</Card.Title>
          <p className={classes.readtime}>{props.readtime} min read</p>
          <Card.Text>{props.content.substring(0, 151)}...</Card.Text>
          <Button className={classes.pinkbtn} as={Link} 
           to= {{
            pathname:'/read-recipe',
            state:{recipeid: props.pk}
          }} 
          >Read More</Button>
        </Card.Body>
      </Card>
)
};



export default RecipeCard;


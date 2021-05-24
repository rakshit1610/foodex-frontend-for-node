import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import classes from './PersonCard.module.css'

const PersonCard = (props) => {
    return(

<Card className={classes.personbox} style={{ width: '39rem' }}>
  <Card.Body>
    <img className={classes.personimg}
  src={props.usrimg}/>
    <span className={classes.usrname}>{props.name} 
    <Link  to= {{
                    pathname:'/user-profile',
                    state:{ownerpk: props.ownerkapk}
                  }} ><button className={classes.checkprofilebtn}>Check Profile</button>
    </Link>
    </span>
    </Card.Body>
</Card>

   )
   };
   
   
   
   export default PersonCard;
   


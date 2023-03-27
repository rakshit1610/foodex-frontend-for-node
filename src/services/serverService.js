import axios from "axios";

const BASE_URL = "https://foodex-backend-node.onrender.com/";
// const BASE_URL = "http://localhost:8000/";

class ServerService {

    login(data){
       return axios.post(BASE_URL + 'auth/login', data)
    }

    signup(data){
      return axios.post(BASE_URL + 'auth/signup', data) 
   }

    otp(data){
      return axios.post(BASE_URL + 'auth/checkOtp', data)
   }

    forgototp(data){
      return axios.post(BASE_URL + 'auth/checkResetOtp',data)
   }

    forgotform(data){
      return axios.post(BASE_URL + 'auth/sendResetOtp',data)
   }

    passresetform(data){
      return axios.post(BASE_URL + 'auth/resetPassword',data)
   }

   followtoggle(data){
   return  axios.put(BASE_URL + 'user/follow',data,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        
    }
    )
   }

   resendotp(resenddata){
    return axios.post(BASE_URL + 'auth/resendOtp',resenddata)
   }

    homecards(){
      return axios.get(BASE_URL + 'recipe/getRecipes')
    }

    profilepicture(formdata, userid){
    return  axios.put(BASE_URL + 'user/changeimg/' + userid, formdata)
    }

    otheruser(data){
      return axios.get(BASE_URL+ 'user/profile/' + data.celebId + '/' + data.fanId,
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
      )
    }

    suggestions(data){
    return axios.post( BASE_URL+'recipe/suggestion/',data,
        {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
          
      })
    }

    userdetails(data){
      return axios.get(BASE_URL+ 'user/myprofile/' +data,
      {
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('access_token')}`
         }
         
     }
      )
    }

    searchpage(data){
      return axios.post(BASE_URL + 'recipe/search',data)
    }

    readrecipe(data){

if(localStorage.getItem('access_token')){
  return axios.get(BASE_URL + 'recipe/read/'+ data.pk +'/' + data.readerpk, 
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    
}
  )

}

else{
  return axios.get(BASE_URL + 'recipe/guestread/'+ data.pk +'/',
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ``
    },
    
}
  )
}

}


  addrecipe(formdata){

  return axios.post(BASE_URL + 'recipe/addRecipe', formdata,
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }   
}
  )
  }

  editrecipe(formdata){
    console.log(formdata)
  return axios.put(BASE_URL+ 'recipe/edit', formdata,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      
  }
    )
  }


  myrecipes(data){

  return axios.get(BASE_URL + 'recipe/list/' + data,
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }   
}
  )
  }

    deletepost(data){
      return axios.delete(BASE_URL +'recipe/delete/'+ data.deletepk+'/' + data.readerpk,

      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        
    }
      
      )
    }


    sort(sortdata){
      return axios.post(BASE_URL + 'recipe/sort',sortdata)
    }



    following(data){
    return axios.get( BASE_URL +'user/followinglist/' +data,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      
  }
    )
}

followers(data){
 return axios.get(BASE_URL + 'user/followerlist/' + data,
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    
}
  )
}


bookmarklist(data){
  return axios.get(BASE_URL + 'user/bookmarklist/' +data,
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    
}
  )
}

    starters(){
      return axios.get(BASE_URL +'recipe/categories/starter')
    }

    maincourse(){
      return axios.get(BASE_URL +'recipe/categories/main_course')
    }
    
    desserts(){
      return axios.get(BASE_URL +'recipe/categories/desserts')
    }

    drinks(){
      return axios.get(BASE_URL +'recipe/categories/drinks/')
    }

    others(){
      return axios.get(BASE_URL +'recipe/categories/others/')
    }

    bookmark(data){
      return axios.put(BASE_URL + 'recipe/bookmark', data,
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          
      }) 
    }

    bookmarkcheck(data){
      return axios.put(BASE_URL + 'recipe/bookmarkcheck', data,
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          
      }) 
    }

    like(data){
      return axios.put(BASE_URL + 'recipe/like/', data,
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          
      }) 
    }

}
  
  export default new ServerService();
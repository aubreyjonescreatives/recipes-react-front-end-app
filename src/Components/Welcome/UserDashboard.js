import * as React from 'react'; 
import { Box } from '@mui/material'
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'; 
import { useMealContext } from '../../contexts/MealContext';
import MealCard from '../MealCard/MealCard';

const style = {
  margin: '50px 10px',
  fontSize: '36px', 
   
    
  }

  

   const typeStyle = {
    margin: '50px 10px', 
    fontSize: '26px'
   
   }



const UserDashboard = () => {
 
  const [findFavorites, setfindFavorites] = React.useState([])
  const {allMeals, favorites} = useMealContext()

console.log(favorites)


  React.useEffect(() => {
    setfindFavorites((prevState) => {
      const finds = allMeals.filter((mealInfo) => favorites.includes(mealInfo.idMeal))
      console.log(finds)
      return [...prevState, ...finds]
    })
    
  }, [favorites, allMeals])



    const identity = useIdentityContext()
    console.log(identity)


    return (
        <>
        <Box className="landingPage">
         <Box sx={style}>
        <h1>Hi, {identity.user?.user_metadata?.full_name}, How's Life?</h1>
        </Box>
       
<Typography sx={typeStyle}>Favorited Meals</Typography>


<Box sx={{display: 'flex', justifyContent: 'center'}}>


{findFavorites.map((meal) => {
    return (

        
       
        <MealCard
        key={meal.idMeal}
        meal={{...meal}}
      
        />
        
    )
    
})}
    </Box>



  



    <Typography sx={typeStyle}>Account Details</Typography>
<Box sx={{display: 'flex', justifyContent: 'center'}}>
<Card sx={{ maxWidth: 345, margin: '20px' }} className="cardAnimation1">
   
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Account Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Steps to take to recover account username, password, etc.
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ maxWidth: 345, margin: '20px' }} className="cardAnimation2">
   
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Account Privacy
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Learn more about account privacy and the extreme measures we take to make sure 
          your information is safe. 
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ maxWidth: 345, margin: '20px' }} className="cardAnimation3">
   
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Account Payment History
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We thank you so much for being a Dine n Dash account user! Here hosts every 
          payment detail made to Dine n Dash.  
        </Typography>
      </CardContent>

    </Card>
    </Box>











    </Box>




    
   </>
   )

}

export default UserDashboard
import * as React from 'react'; 
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'; 
import ListItemIcon from '@mui/material/ListItemIcon'; 
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useIdentityContext } from 'react-netlify-identity-gotrue'
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMealContext } from '../../contexts/MealContext';


const linkStyling = {
  fontSize: '20px', 
  color: 'white', 
  textDecoration: 'none',
  "&:hover": {
    color: 'white', 
   
   
  }

}



const NavBar = () => {


 const identity = useIdentityContext()

  // const history = useHistory()
  
  const { favorites } = useMealContext()

  const [isOpen, setIsOpen] = React.useState(false)

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  // const handleNavChoice = () => {
  //   history.push('/MealFavorites')
  //   toggleDrawer()
  //   console.log("Go to this route now...")
  // }

const drawerItemList = () => (
  <Box sx={{width: 250, backgroundColor: '#5FAD56'}} role="presentation" className="drawerMenu">
    <List>
    <ListItem button>
        <ListItemIcon sx={{color: "white"}}>
          <RestaurantIcon/>
        </ListItemIcon>
        <Link href="/" sx={linkStyling}>Dash n' Dine</Link>
      </ListItem>
       {identity.user && (
      <ListItem button>
        <ListItemIcon sx={{color: "white"}}>
          <MenuBookIcon/>
        </ListItemIcon>
        <Link href="/LatestMeals" sx={linkStyling}>Latest Meals</Link>
      </ListItem>
 )}
   {identity.user && (
      <ListItem button>
        <ListItemIcon sx={{color: "white"}}>
          <FavoriteIcon/>
        </ListItemIcon>
        <Link href="/FavoritesPage" sx={linkStyling}>Favorites: {favorites?.length}</Link>
      </ListItem>
 )}
  {identity.user && (
     <ListItem button  onClick={identity.logout}>
     <ListItemIcon sx={{color: "white"}}>
       <LogoutIcon/>
     </ListItemIcon>
     <Link href="/" className="navlink-3" sx={linkStyling}>Logout</Link>
   </ListItem>
            
           )}
    
    </List>
  </Box>
)

  return (
  <> 
  <nav id="navWrapper" >
   
  <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ backgroundColor:"#5FAD56", width: "100%", boxShadow: 0  }} >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 3, width: '300px'}}>
          <Link href='/' sx={linkStyling}>Dash n' Dine</Link>
          </Typography>
          {identity.user && (
      <ListItem sx={{justifyContent: 'flex-end', flexGrow: 1, color: 'white'}} button >
        <ListItemIcon>
      <Avatar sx={{width: 30, height: 30, backgroundColor: 'white', color: "#5FAD56"}}>{identity.user?.user_metadata?.full_name.slice(0, 1)}</Avatar>
        </ListItemIcon>
        <Typography>
        <Link href='/Welcome' sx={linkStyling}>Hi, {identity.user?.user_metadata?.full_name}</Link>
        </Typography>
      </ListItem>
      )}
        </Toolbar>
        
      </AppBar>
    </Box>
    
      </nav>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer} sx={{backgroundColor: '57FAD56'}}>
      {drawerItemList()}
      </Drawer>
  </>
  );
}

export default NavBar;

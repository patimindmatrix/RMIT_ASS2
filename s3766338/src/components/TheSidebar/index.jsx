import { Box } from '@mui/material';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu.js";
import Typography from "@mui/material/Typography";
import {typeLocal} from "../../constants/index.js";
import {toast} from "react-toastify";
import {NavLink, useNavigate} from "react-router-dom";


export  default  function TheSidebar( ) {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem(typeLocal.ACCOUNT_LOGIN)
    navigate('/login')
    toast.success('You have logged out susscessful')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', flex: 1, alignItems: 'center', justifyContent:'flex-end', gap: 2 }}>
            <NavLink to="/" className="nav-link">
              <Typography variant="h6" component="div" >
                Home
              </Typography>
            </NavLink>
            <NavLink to="/profile" className="nav-link">
              <Typography variant="h6" component="div" >
                Profile
              </Typography>
            </NavLink>
            <Typography variant="h6" component="div" onClick={handleLogout}>
              Logout
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
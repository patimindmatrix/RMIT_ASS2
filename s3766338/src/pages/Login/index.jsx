import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {messageAuth, typeLocal} from "../../constants/index.js";
import {toast} from "react-toastify";
import * as yup from "yup";
import {NavLink, useNavigate} from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password:yup.string().min(8)
  })
  .required()
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const navigate = useNavigate()
  const onSubmit = (data) => {
    console.log(data)
    const listAccount =
      localStorage.getItem(typeLocal.ACCOUNTS) ?
        JSON.parse(localStorage.getItem(typeLocal.ACCOUNTS)) : []
    const index = listAccount.findIndex(item => item.email === data.email && item.password === data.password)
    if(index === -1) {
      toast.error(messageAuth.LOGIN_ERROR)
      return
    }
    toast.success(messageAuth.LOGIN_SUCCESS)
    localStorage.setItem(typeLocal.ACCOUNT_LOGIN, JSON.stringify(listAccount[index]))
    navigate('/profile')
  }

  return (
    <Box>
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
            <NavLink to='/register' className='nav-link' style={{display: 'block', flex: 1}}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
                Register
              </Typography>
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ maxWidth: '500px' , margin: 'auto'}}>
        <Typography sx={{marginBottom:3}} component="h1" variant="h4">Sign In</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{marginBottom: 2}}>
            <TextField
              error={errors.email && errors.email.message}
              fullWidth
              variant="filled"
              id="outlined-password-input"
              label="Email"
              type="email"
              {...register("email")}
            />
            <Typography sx={{textAlign: 'left', fontSize: '10px', color: 'red'}}>{errors.email ? errors.email.message : null}</Typography>

          </Box>
          <Box sx={{marginBottom: 2}}>
            <TextField
              error={errors.password && errors.password.message}
              fullWidth
              variant="filled"
              id="outlined-password-input"
              label="Password"
              type="password"
              {...register("password")}
            />
            <Typography sx={{textAlign: 'left', fontSize: '10px', color: 'red'}}>{errors.password ? errors.password.message : null}</Typography>

          </Box>
          <Box sx={{marginBottom: 2}}>
            <Box>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default  LoginPage
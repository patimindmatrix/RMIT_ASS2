import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {TextField} from "@mui/material";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {messageAuth, typeLocal} from "../../constants/index.js";
import { toast } from 'react-toastify';
import {NavLink, useNavigate} from "react-router-dom";
import { uid } from 'react-uid';
const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password:yup.string().min(8)
  })
  .required()
const RegisterPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    console.log(data)

    const listAccount =
      localStorage.getItem(typeLocal.ACCOUNTS) ?
    JSON.parse(localStorage.getItem(typeLocal.ACCOUNTS)) : []
    const index = listAccount.findIndex(item => item.email === data.email)
    if(index !== -1) {
      toast.error(messageAuth.REGISTER_EXITS)
      return
    }
    const newAccount = {
      ...data,
      created_at: new Date(),
      _id: uid(data.email)
    }
    listAccount.push(newAccount)
    localStorage.setItem(typeLocal.ACCOUNTS, JSON.stringify(listAccount))
    localStorage.setItem(typeLocal.ACCOUNT_LOGIN, JSON.stringify(newAccount))
    toast.success(messageAuth.REGISTER_SUCCESS)
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
            <NavLink to='/login' className='nav-link' style={{display: 'block', flex: 1}}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
                Login
              </Typography>
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ maxWidth: '500px' , margin: 'auto'}}>
        <Typography sx={{marginBottom:3}} component="h1" variant="h4">Sign Up</Typography>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{marginBottom: 2,}}>
            <TextField
              error={errors.username && errors.username.message}
              fullWidth
              variant="filled"
              id="outlined-password-input"
              label="Name"
              type="text"
              {...register("username")}
            />
            <Typography sx={{textAlign: 'left', fontSize: '10px', color: 'red'}}>{errors.username ? errors.username.message : null}</Typography>
          </Box>
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
          <Box>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
        </Box>
    </Box>
  )
}

export default  RegisterPage
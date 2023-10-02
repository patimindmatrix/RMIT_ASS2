import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import {
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {isEmptyObject, typeLocal} from "../../constants/index.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import TheSidebar from "../../components/TheSidebar/index.jsx";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password:yup.string().min(8)
  })
  .required()
const ProfilePage = () => {
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem(typeLocal.ACCOUNT_LOGIN)) || {})
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: profile.username || '',
      email: profile.email || '',
      password: profile.password || ''
    }
  })

  const onSubmit = (data) => {
    console.log(data)
    const listAccount = JSON.parse(localStorage.getItem(typeLocal.ACCOUNTS)) || []
    const index = listAccount.findIndex(item => item._id === profile._id)
    const accountUpdated =  {...listAccount[index], ...data}
    listAccount[index] = accountUpdated
    localStorage.setItem(typeLocal.ACCOUNTS, JSON.stringify(listAccount))
    localStorage.setItem(typeLocal.ACCOUNT_LOGIN, JSON.stringify(accountUpdated))
    setProfile(accountUpdated)
    toast.success('You have updated profile successful')
    handleCloseUpdate()
  }


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };


  useEffect(() => {
    if(!profile || isEmptyObject(profile)) navigate('/login')
  }, [profile])

  const handleDeleteAccount = () => {
    const listAccount = JSON.parse(localStorage.getItem(typeLocal.ACCOUNTS))
    const index = listAccount.find((item) => item._id === profile._id)
    listAccount.splice(index, 1)
    localStorage.setItem(typeLocal.ACCOUNTS, JSON.stringify(listAccount))
    localStorage.removeItem(typeLocal.ACCOUNT_LOGIN)
    toast.success("You have deleted account successful")
    navigate('/login')
  }
  if(!profile || isEmptyObject(profile)) return
  return <Box>
    <TheSidebar/>
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Card sx={{ minWidth: 500 }}>
        <CardActionArea>
          <Typography
            component="h6" variant="h6"
            sx={{textAlign: 'left', padding: "5px 10px", color: '#E91E63'}}>
            Profile
          </Typography>
          <CardContent>
           <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
             <Box>
               <Box sx={{display: 'flex'}}>
                 <Box sx={{marginRight: 2}}>
                   <img className="card-image" src="http://inspiredluv.com/wp-content/uploads/2016/09/11-beautiful-girl-image.jpg" alt=""/>
                 </Box>
                 <Box sx={{textAlign: 'left'}}>
                   <Typography gutterBottom variant="p" component="p">
                     {profile?.username}
                   </Typography>
                   <Typography variant="body2" color="text.secondary">
                     {profile?.email}
                   </Typography>
                 </Box>
               </Box>
             </Box>
             <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
               <Button sx={{marginRight: 1}} onClick={handleOpenUpdate}>
                 <EditIcon/>
               </Button>
               <Button onClick={handleOpen}>
                 <DeleteIcon/>
               </Button>
             </Box>
           </Box>
          </CardContent>
          <Box sx={{padding: 2, textAlign: 'left', borderTop: '1px solid #ccc'}}>
            <Typography>Joined: {new Date(profile?.created_at).toLocaleDateString("en-US")}</Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
    <Dialog onClose={handleClose} open={open} sx={{minWidth: '568px'}}>
      <DialogTitle>{"Delete Account"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
         Confirm to delete your account
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button onClick={handleDeleteAccount} sx={{color: '#E91E63'}}>CONFIRM</Button>
      </DialogActions>
    </Dialog>
    <Dialog onClose={handleClose} open={openUpdate}  PaperProps={{
      sx: {
        width: "100%",
        minWidth: "720px!important",
      },
    }}>
      <DialogTitle>{"  Update Profile"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseUpdate}>CANCEL</Button>
        <Button type="submit"  sx={{color: '#E91E63'}}>CONFIRM</Button>
      </DialogActions>
      </form>
    </Dialog>
  </Box>
}

export default  ProfilePage
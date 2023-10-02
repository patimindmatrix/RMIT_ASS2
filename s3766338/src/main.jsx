import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {BrowserRouter} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
        <ToastContainer/>
        <App />
      <CssBaseline/>
    </ThemeProvider>
  </BrowserRouter>
)

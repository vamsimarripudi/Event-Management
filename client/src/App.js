import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from "./components/ResetPassword"
import Events from './components/Events';
import Home from "./components/Home"
import EventDetails from './components/EventDetails';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import ProtectedRoute from "./components/protectedRoute";
import FeedbackPopup from './components/Feedback/feedback';
import Profile from "./components/Profile";
import MyEvents from "./components/MyEvents";
import {Toaster} from "react-hot-toast";
import Analytics  from './components/Analytics';
import { ThemeProvider } from 'styled-components';
import {darkTheme,lightTheme} from "./theme";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from 'react';
import GlobalStyle from './styles/GlobalStyles';
import ApiDashboard from "./components/ApiDashboard";
import AdminRoute from './utils/AdminRoute';


const App = () => {
  const {activeTheme} = useContext(ThemeContext);
  return (
    <>
    <ThemeProvider 
    theme={
      activeTheme === "dark"?darkTheme:lightTheme
    }
    >
      <GlobalStyle/>
    <Toaster 
        position="top-right"
        reverseOrder = {false}
        toastOptions={{
          duration:3000,

          style:{
            background:"#111827",
            color:"#fff",
            borderRadius:"12px",
            padding:"14px 16px",
            fontSize:"14px"
          },

          success:{
            iconTheme:{
              primary:"#22c55e",
              secondary:"#fff"
            },
          },

          error:{
            iconTheme:{
              primary:"#ef4444",
              secondary:"#fff",
            },
          },
        }}
        />
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/register" element = {<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route exact path="/" element={<Home />}/>
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
        <Route path = "/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path = "/dashboard/my-events" element={<ProtectedRoute><MyEvents/></ProtectedRoute>}/>
        <Route path="/analytics" element={<AdminRoute><Analytics/></AdminRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path = "/api-dashboard" element = {<AdminRoute><ApiDashboard/></AdminRoute>}/>
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound/>}/>
       
      </Routes>
     <FeedbackPopup/>
    </Router>
    </ThemeProvider>
    </>
  );
}

export default App;

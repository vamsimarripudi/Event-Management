import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import ProtectedRoute from "./components/protectedRoute";


const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/register" element = {<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
        <Route path = "/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

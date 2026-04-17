import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Events from './components/Events';
import NotFound from './components/NotFound';
import ProtectedRoute from "./components/protectedRoute";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element = {<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

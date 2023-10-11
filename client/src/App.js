
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Update from './pages/Update';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {



  return (
   
    <Router>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/update/:id'  element={<Update/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/register'  element={<Register/>}/>
      </Routes>
    </Router>

  );
}

export default App;

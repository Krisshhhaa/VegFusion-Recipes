import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddRecipe from './components/AddRecipe';
import Detail from './components/Detail';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Register from './components/Register';
import Saved from './components/Saved';


const App = () => {
  return (
    <>
    <Router>
  <Navbar/>
<Routes>


<Route path='/' element ={<Home/>} />
   <Route path='/login' element ={<Login/>} />
   <Route path='/Register' element ={<Register/>} />
   <Route path='/profile' element ={<Profile/>} />
   <Route path='/saved' element ={<Saved/>} />
   <Route path='/add' element ={<AddRecipe/>} />
   <Route path='/:id' element ={<Detail/>} />
   


   
  </Routes>
    </Router>
    </>
  )
}

export default App

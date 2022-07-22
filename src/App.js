import React from 'react';
import './index.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'  
import Home from './components/home'
const routing = (  
  <Router>  
    <Routes>   
      <Route exact path="/App" element={<App />} />  
      <Route exact path="/" element={<Home />} />  
      
    </Routes>  
  </Router>  
) 
export default function App() {
  return (routing );
}
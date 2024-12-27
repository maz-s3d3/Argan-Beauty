import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Compenents/Header/Header.jsx';
import Hero from './Compenents/Hero/Hero.jsx';
import Card from './Compenents/Card/Card.jsx';
import Home from './Compenents/Home/Home.jsx';
import DetailCard from './Compenents/detailCard/deatilCard.jsx';
import Contact from './Compenents/Contact/Contact.jsx';
import Ss from './Compenents/Ss.jsx'
import Login from './Compenents/login/Login.jsx';
import Parteners from './Compenents/Parteners.jsx'
import About from './Compenents/About/About.tsx';  // If it'
import cardContext from './Compenents/CartContext.jsx'
// s a TypeScript file
function App() {
  return (
    <Router>
      {/* Le Header sera toujours visible sur toutes les pages */}
      <Header />
    

      
      {/* Le contenu changera en fonction des routes */}
      <div>
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={
            <>
            <Home/>
            <Hero />  {/* Affiche Hero */}
            <Ss />   
            <Parteners/>
            
             {/* Affiche la section sous le Hero */}
          </>
        } />
          
          {/* Route pour la page des produits */}
          <Route path="/card" element={<Card />} />
          <Route path='/about' element={<About/>}/>
          
          {/* Route pour la page de contact */}
          <Route path="/contact" element={<Contact />} />
          <Route path='/detailCard/:id' element={<DetailCard />} />

          
          {/* Route pour la page de login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Compenents/Header/Header.jsx';
import Hero from './Compenents/hero/hero';
import Card from './Compenents/card/card';
import DetailCard from './Compenents/detailCard/DetailCard';
import Contact from './Compenents/Contact/Contact';
import Ss from './Compenents/Ss'
import Login from './Compenents/login/Login';
import Parteners from './Compenents/Parteners'
import About from './Compenents/About/About.tsx';  // If it's a TypeScript file
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
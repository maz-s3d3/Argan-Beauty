import Card from "./Card.jsx";
import AddProduct from "./AddProduct";
import './index.css'
import AddCategory from "./AddCategorie.jsx";
import Auth from "./auth.jsx";
import AddAdmin from "./AddAdmin.jsx";
import DetailCard from "./ProductDetails.jsx";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useState } from "react";

export default function App(){
    
    return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Card/>}/>
        <Route path="/ProductDetails/:id" element={<DetailCard />}/>
        <Route path="/Auth" element={<Auth/>}/>
        <Route path="/AddAdmin" element={<AddAdmin/>}/>
        <Route path="/AddCategory" element={<AddCategory/>}/>
        <Route path="/AddProduct" element={<AddProduct/>}/>
    </Routes>
</BrowserRouter>
)

}

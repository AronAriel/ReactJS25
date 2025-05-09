import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomeSection from "../../components/HomeSection/HomeSection";
import { CartProvider } from "../../context/CartContext";

function HomePage() {
  return (
    <CartProvider>
    <Header />
    <HomeSection />
    <Footer />
  </CartProvider>
  
    
  );
}

export default HomePage;

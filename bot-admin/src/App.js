import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Bot from './components/bot';
import Calculator from './components/calculator';
import ContactMe from './components/contactMe';
import AboutUs from './components/aboutUs';
import Dashboard from './components/dashboard'; // Asegúrate de que la ruta sea correcta

function App() {
    return (
        <Dashboard>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bot" element={<Bot />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/contact" element={<ContactMe />} />
                <Route path="/about" element={<AboutUs />} />
            </Routes>
        </Dashboard>
    );
}

export default App;

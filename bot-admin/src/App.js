import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Pedidos from './components/pedidos';
import ContactMe from './components/contactMe';
import AboutUs from './components/aboutUs';
import Dashboard from './components/dashboard'; 
import Reservas from './components/reservas'; 
import PerfilDeUsuario from './components/perfilDeUsuario';
import Estadisticas from "./components/Estadisticas/estadisticas"
import LandingPage from "./components/landing"
import { UserProvider } from './components/context/UserContext';


function App() {
    return (
        <UserProvider>
        <Router>
            <Dashboard>
                <Routes>
                <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                   
                    <Route path="/pedidos" element={<Pedidos />} />
                    <Route path="/Estadisticas" element={<Estadisticas />} />
                    <Route path="/contact" element={<ContactMe />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/reservas" element={<Reservas />} />
                    <Route path="/perfil" element={<PerfilDeUsuario />} /> {/* Ruta para el perfil */}
                </Routes>
            </Dashboard>
        </Router>
        </UserProvider>
    );
}

export default App;

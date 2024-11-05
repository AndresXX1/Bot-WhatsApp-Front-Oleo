import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Pedidos from './components/pedidos';
import ContactMe from './components/contactMe';
import AboutUs from './components/aboutUs';
import Dashboard from './components/dashboard'; 
import Reservas from './components/reservas'; 
import PerfilDeUsuario from './components/perfilDeUsuario';
import Estadisticas from "./components/Estadisticas/estadisticas";
import LandingPage from "./components/landing";
import Reviews from "./components/reviews";
import Usuarios from "./components/usuarios";
import { UserProvider } from './components/context/UserContext';
import { AuthProvider } from './components/localStore/authContext'; // Asegúrate de importar el AuthProvider

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <Router>
                    <Dashboard>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/reviews" element={<Reviews />} />
                            <Route path="/pedidos" element={<Pedidos />} />
                            <Route path="/Estadisticas" element={<Estadisticas />} />
                            <Route path="/contact" element={<ContactMe />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/reservas" element={<Reservas />} />
                            <Route path="/users" element={<Usuarios />} />
                            <Route path="/perfil" element={<PerfilDeUsuario />} />
                        </Routes>
                    </Dashboard>
                </Router>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;

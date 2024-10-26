import React from 'react';
import { IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';
import "../styles/pieDePagina.css"; // Importa el archivo CSS

const PieDePagina = () => {
    return (
        <footer className="footer" >
            <div className="footer-content">
                <p>&copy; 2024 Andres Sebastian Vera. Todos los derechos reservados.</p>
                <div className="social-icons">
                    <IconButton href="https://github.com/AndresXX1" target="_blank" color="inherit">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com/in/andres-vera-676414281/" target="_blank" color="inherit">
                        <LinkedInIcon />
                    </IconButton>
                    <IconButton href="https://portafolios-topaz.vercel.app/" target="_blank" color="inherit">
                        <WebIcon />
                    </IconButton>
                </div>
            </div>
        </footer>
    );
};

export default PieDePagina;

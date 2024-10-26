import React from 'react';
import { Avatar, Card, CardContent, CardHeader, Typography, Button, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';
import '../styles/aboutUs.css'; // Importa el archivo CSS

const AboutUs = () => {
    const openLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="about-us-container">
            <Card className="about-card" sx={{backgroundColor:"rgba(255, 255, 255, 0.8)"}}>
                <CardHeader
                    title="Sobre Mi"
                    titleTypographyProps={{ variant: 'h4', align: 'center' }}
                />
               <Avatar 
                  alt="Your Image" 
                  src="/yo.png" 
                  className="avatar" 
                  sx={{ 
                    minWidth: "120px", 
                    height: "120px", 
                    width: "120px" 
                  }} 
                />
                <CardContent>
                    <Typography variant="h5" align="center" className="name-title">
                        Andres Sebastian Vera
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Me apasiona crear soluciones digitales innovadoras que transformen el mundo.
                    </Typography>
                    <Typography variant="body2" align="justify">
                        Mi misión es crear valor y hacer la diferencia ofreciendo servicios y productos excepcionales. 
                        Estoy comprometido con la excelencia y la innovación en todo lo que hago. Únete a mí en este viaje 
                        para hacer del mundo un lugar mejor a través de la tecnología y la creatividad.
                    </Typography>
                </CardContent>
                <div className="social-icons">
                    <Tooltip title="GitHub - Mi repositorio de proyectos">
                        <Button onClick={() => openLink('https://github.com/AndresXX1')} className="icon-button">
                            <GitHubIcon fontSize="large" />
                        </Button>
                    </Tooltip>
                    <Tooltip title="LinkedIn - Conéctate conmigo">
                        <Button onClick={() => openLink('https://www.linkedin.com/in/andres-vera-676414281/')} className="icon-button">
                            <LinkedInIcon fontSize="large" />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Portafolio - Mira mis trabajos">
                        <Button onClick={() => openLink('https://portafolios-topaz.vercel.app/')} className="icon-button">
                            <WebIcon fontSize="large" />
                        </Button>
                    </Tooltip>
                </div>
            </Card>
        </div>
    );
};

export default AboutUs;

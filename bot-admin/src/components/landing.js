import { useState } from 'react';
import LoginPage from './login'; // Ajusta la ruta según tu estructura
import RegisterPage from './register'; // Ajusta la ruta según tu estructura
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const LandingPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  const toggleRegister = () => {
    setShowRegister(prev => !prev);
  };

  return (
    <Box
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     minHeight: '100vh',
    //     position: 'relative',
    //     backgroundImage: 'url(/robotillo.jpeg)', // Cambia la URL según tu imagen
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //   }}
    >
      <Box sx={{ zIndex: 1, width: '100%', maxWidth: '400px' }}>
        {showRegister ? (
          <>
            <RegisterPage />
            <Typography variant="body2" sx={{ mt: 2 }}>
              ¿Ya tienes una cuenta? 
              <Button onClick={toggleRegister} sx={{ color: 'green' }}>
                Inicia sesión
              </Button>
            </Typography>
          </>
        ) : (
          <>
            <LoginPage />
            <Typography variant="body2" sx={{ mt: 2 }}>
              ¿No tienes una cuenta? 
              <Button onClick={toggleRegister} sx={{ color: 'green' }}>
                Regístrate
              </Button>
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LandingPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Grid, 
  Paper, 
  Button, 
  CircularProgress,
  Typography, 
  ThemeProvider, 
  createTheme, 
  CssBaseline
} from '@mui/material';
import { styled } from '@mui/system';
import { QRCodeCanvas } from 'qrcode.react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a3a3a',
    },
    secondary: {
      main: '#e8c39e',
    },
    background: {
      default: '#0a3a3a',
      paper: '#1c4e4e',
    },
    text: {
      primary: '#e8c39e',
      secondary: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#e8c39e',
      '@media (min-width:600px)': { fontSize: '2.5rem' },
    },
    h2: {
      fontSize: '1.2rem',
      fontWeight: 600,
      color: '#e8c39e',
      '@media (min-width:600px)': { fontSize: '1.5rem' },
    },
    body1: {
      color: '#ffffff',
    },
  },
});

const FeatureIcon = styled('div')(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const Instructions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  textAlign: 'left',
}));

const Home = () => {
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qrResult = await axios.get('https://whatsapp-bot-oleo.onrender.com/api/get-qr');
        if (qrResult.data.qrCode) {
          setQrCode(qrResult.data.qrCode);
        } else {
          setQrCode('');
        }
      } catch (error) {
        console.error('Error fetching QR code:', error.message);
        setQrCode('');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 50000);
    return () => clearInterval(intervalId);
  }, []);

  const handleConnectionSuccess = () => {
    setConnected(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 2, 
                backgroundColor: 'rgba(28, 78, 78, 0.9)', 
                mb: 4 
              }} 
              elevation={3} // Añade sombra aquí
            >
              <Typography variant="h1" align='center' sx={{ color: theme.palette.text.primary }}>
                Bienvenido a Oleo Bot WhatsApp
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                alignItems: 'center',
                backgroundColor: 'rgba(28, 78, 78, 0.9)' 
              }} 
              elevation={3} // Añade sombra aquí
            >
              <Instructions sx={{ flex: 1 }}>
                <Typography variant="h2" gutterBottom>
                  Instrucciones
                </Typography>
                <Typography variant="body1" paragraph>
                  Para configurar Oleo WhatsApp en tu celular, debes hacer lo siguiente:
                </Typography>
                <Typography variant="body1" paragraph>
                  1. Abre WhatsApp en tu teléfono.
                </Typography>
                <Typography variant="body1" paragraph>
                  2. Toca menú [icono de tres puntitos verticales] en Android o Ajustes en iPhone.
                </Typography>
                <Typography variant="body1" paragraph>
                  3. Toca "dispositivos vinculados" y luego "vincular un dispositivo".
                </Typography>
                <Typography variant="body1" paragraph>
                  4. Apunta tu teléfono hacia esta pantalla para escanear el código QR.
                </Typography>
              </Instructions>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                {loading ? (
                  <CircularProgress />
                ) : connected ? (
                  <CheckCircleIcon sx={{ fontSize: { xs: 80, md: 100 }, color: theme.palette.secondary.main }} />
                ) : qrCode ? (
                  <QRCodeCanvas 
                    value={qrCode}
                    size={200}
                    onClick={handleConnectionSuccess}
                  />
                ) : (
                  <Typography>No hay código QR disponible</Typography>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              height: '100%', 
              backgroundColor: 'rgba(28, 78, 78, 0.9)' 
            }} elevation={3}> {/* Añade sombra aquí */}
              <FeatureIcon>
                <RestaurantMenuIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
              </FeatureIcon>
              <Typography variant="h2" gutterBottom>
                Ver Menú
              </Typography>
              <Typography>
                Explora nuestro menú actualizado directamente desde WhatsApp
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              height: '100%', 
              backgroundColor: 'rgba(28, 78, 78, 0.9)' 
            }} elevation={3}> {/* Añade sombra aquí */}
              <FeatureIcon>
                <EventIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
              </FeatureIcon>
              <Typography variant="h2" gutterBottom>
                Reservar Mesa
              </Typography>
              <Typography>
                Haz una reserva rápida y fácil a través de nuestro bot
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              height: '100%', 
              backgroundColor: 'rgba(28, 78, 78, 0.9)' 
            }} elevation={3}> {/* Añade sombra aquí */}
              <FeatureIcon>
                <InfoIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
              </FeatureIcon>
              <Typography variant="h2" gutterBottom>
                Información
              </Typography>
              <Typography>
                Obtén información sobre horarios, ubicación y eventos especiales
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ 
              p: 2, 
              display: 'flex', 
              justifyContent: 'center', 
              backgroundColor: 'rgba(28, 78, 78, 0.9)' 
            }} elevation={3}> {/* Añade sombra aquí */}
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
              >
                Chatear Ahora
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Home;

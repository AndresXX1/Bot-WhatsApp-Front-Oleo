import React, { useState, useRef } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    ThemeProvider,
    createTheme,
    CssBaseline,
    ListItemIcon,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EventIcon from '@mui/icons-material/Event';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import FunctionsIcon from '@mui/icons-material/Functions';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PerfilDeUsuario from './perfilDeUsuario';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0a3a3a',
        },
        secondary: {
            main: '#e8c39e',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#0a3a3a',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
        },
    },
});

const menuItems = [
    { text: 'Inicio', path: '/', icon: <HomeIcon /> },
    { text: 'Bot', path: '/bot', icon: <SmartToyIcon /> },
    { text: 'Pedidos', path: '/pedidos', icon: <ShoppingCartIcon /> },
    { text: 'Reservas', path: '/reservas', icon: <EventIcon /> },
    { text: 'Contáctame', path: '/contact', icon: <ContactMailIcon /> },
    { text: 'Sobre Nosotros', path: '/about', icon: <InfoIcon /> },
];

const ScrollDialogContent = styled(DialogContent)(({ isScrolling }) => ({
    overflowY: isScrolling ? 'auto' : 'hidden',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
        width: '8px',
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#555',
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#777',
    },
}));

function Dashboard({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollRef = useRef(null);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path) => {
        if (path === '/perfil') {
            setProfileDialogOpen(true);
        } else {
            window.location.pathname = path;
        }
        setDrawerOpen(false);
    };

    const handleCloseProfileDialog = () => {
        setProfileDialogOpen(false);
        setIsScrolling(false);
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            setIsScrolling(scrollHeight > clientHeight);
        }
    };

    const handleWheel = (e) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop += e.deltaY;
            setIsScrolling(scrollRef.current.scrollHeight > scrollRef.current.clientHeight);
        }
    };

    const drawer = (
        <Box 
            sx={{ 
                width: 240, 
                height: '100%', 
                backgroundImage: 'url(/log3.webp)', // Imagen de fondo
                backgroundSize: 'cover', 
                backgroundPosition: 'bottom',
                paddingTop: '40px', // Ajusta la posición hacia abajo
            }}
        >
 <List>
    {menuItems.map((item) => (
        <ListItem 
            button 
            key={item.text} 
            onClick={() => handleNavigation(item.path)}
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)', // Fondo semitransparente más opaco
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Sombra
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.15)', // Color de fondo en hover más visible
                },
            }}
        >
            <ListItemIcon sx={{ color: '#0a3a3a' }}>{item.icon}</ListItemIcon>
            <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                    style: { 
                        color: '#0a3a3a', 
                        textShadow: '1px 1px 2px rgba(255, 255, 255, 0.7)' // Sombra de texto
                    } 
                }} 
            />
        </ListItem>
    ))}
</List>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Box component="img" src="./logo4.png" alt="Logo" sx={{ height: 90, mr: 2, width: 120 }} /> {/* Logo */}
                        <Typography variant="h6" sx={{ flexGrow: 1, color: 'secondary.main' }}>
                            ÓLEO Bot
                        </Typography>
                        <IconButton color="inherit" onClick={() => handleNavigation("/funciones")}>
                            <FunctionsIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={() => handleNavigation("/como-usar")} sx={{ ml: 2 }}>
                            <HelpIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleUserMenuClick} sx={{ ml: 2 }}>
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            top: '64px',
                            height: 'calc(100% - 64px)',
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(5px)',
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={() => { handleCloseMenu(); handleNavigation("/perfil"); }}>Perfil de Usuario</MenuItem>
                    <MenuItem onClick={() => { handleCloseMenu(); handleNavigation("/configuraciones"); }}>Configuraciones</MenuItem>
                    <MenuItem onClick={() => { handleCloseMenu(); /* Implementar lógica de logout */ }}>Cerrar Sesión</MenuItem>
                </Menu>

                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    {children}
                </Box>

                {/* Modal para el perfil de usuario */}
                <Dialog
                    open={profileDialogOpen}
                    onClose={handleCloseProfileDialog}
                    fullWidth
                    maxWidth="md"
                    sx={{
                        '& .MuiDialog-paper': {
                            backgroundColor: theme.palette.background.default,
                            boxShadow: 'none',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <DialogTitle sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.text.primary }}>
                        Perfil de Usuario
                    </DialogTitle>
                    <ScrollDialogContent
                        ref={scrollRef}
                        onScroll={handleScroll}
                        onWheel={handleWheel}
                        isScrolling={isScrolling}
                        sx={{ bgcolor: theme.palette.background.default, p: 0 }}
                    >
                        <PerfilDeUsuario />
                    </ScrollDialogContent>
                    <DialogActions sx={{ backgroundColor: theme.palette.secondary.main }}>
                        <Button onClick={handleCloseProfileDialog} sx={{ color: theme.palette.text.primary }}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}

export default Dashboard;

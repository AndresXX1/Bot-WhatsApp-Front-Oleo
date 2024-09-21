import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Dashboard({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Inicio" />
                </ListItem>
                <ListItem button component={Link} to="/bot">
                    <ListItemText primary="Bot" />
                </ListItem>
                <ListItem button component={Link} to="/calculator">
                    <ListItemText primary="Calculadora" />
                </ListItem>
                <ListItem button component={Link} to="/contact">
                    <ListItemText primary="Contáctame" />
                </ListItem>
                <ListItem button component={Link} to="/about">
                    <ListItemText primary="Sobre Nosotros" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                {/* Barra de navegación lateral */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Barra de navegación móvil */}
                <AppBar position="fixed" sx={{ display: { sm: 'none' } }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Mejora el rendimiento en pantallas móviles
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </Router>
    );
}

export default Dashboard;

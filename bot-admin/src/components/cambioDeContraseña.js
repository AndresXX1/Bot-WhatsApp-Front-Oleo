import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  Typography,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const CambioDeContraseña = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    confirmNewPassword: '',
  });
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.newPassword === values.confirmNewPassword) {
      toast.success('Contraseña cambiada exitosamente');
      handleClickOpen(); // Abrir el modal después de éxito
    } else {
      toast.error('Las contraseñas no coinciden');
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = (shouldLogout) => {
    setOpen(false);
    if (shouldLogout) {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/pages/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>{"Aplicar Cambios"}</DialogTitle>
        <DialogContent>
          Para aplicar los cambios necesitas volver a iniciar sesión.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Más tarde</Button>
          <Button onClick={() => handleClose(true)}>Logout</Button>
        </DialogActions>
      </Dialog>
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12} display="flex" alignItems="flex-start">
            <Box flexGrow={1}>
              <Typography variant="h5" style={{ marginBottom: '16px' }}>
                Cambio de contraseña
              </Typography>
              <TextField
                label="Contraseña actual"
                type="password"
                name="currentPassword"
                value={values.currentPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputProps={{ style: { height: '56px', fontSize: '16px' } }}
              />
              <TextField
                label="Nueva contraseña"
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputProps={{ style: { height: '56px', fontSize: '16px' } }}
              />
              <TextField
                label="Confirmar nueva contraseña"
                type="password"
                name="confirmNewPassword"
                value={values.confirmNewPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputProps={{ style: { height: '56px', fontSize: '16px' } }}
              />
            </Box>
            <img src="/config.png" alt="Configuración" style={{ height: '220px', marginTop: "70px", marginLeft: '16px' }} />
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#e8c39e', color: 'black' }}>Guardar Cambios</Button>
        <Button type="reset" variant="outlined" sx={{ backgroundColor: '#fffff', color: 'black' }}>Reiniciar</Button>
      </Box>
    </form>
  );
};

export default CambioDeContraseña;

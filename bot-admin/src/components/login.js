import { useState } from 'react';
import RegisterPage from './register'; // Asegúrate de que la ruta sea correcta
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormHelperText from '@mui/material/FormHelperText';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [showRegister, setShowRegister] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateFields = () => {
    const newErrors = {
      email: values.email ? '' : 'El email es obligatorio',
      password: values.password ? '' : 'La contraseña es obligatoria',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      toast.error('Por favor completa todos los campos correctamente.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Lógica de inicio de sesión
    try {
      localStorage.setItem('authToken', 'tu_token_aqui'); // Guardar token simulado
      toast.success('¡Inicio de sesión exitoso!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast.error('Error al iniciar sesión. Por favor, verifica tus credenciales.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  if (showRegister) {
    return <RegisterPage />;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/robotillo.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
        zIndex: 1,
      }}
    >
      <ToastContainer />
      <Box sx={{ width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 4, borderRadius: 2 }}>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
          Bienvenidos a Oleo Bot 👋🏻
        </Typography>
        <Box
          component="img"
          src="./logo20.png"
          alt="Descripción de la imagen"
          sx={{
            width: "120px",
            height: "120px",
            display: 'block',
            margin: '0 auto',
          }}
        />
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            id='email'
            label='E-mail'
            sx={{ marginBottom: 2 }}
            value={values.email}
            onChange={handleChange('email')}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }} error={Boolean(errors.password)}>
            <InputLabel htmlFor='auth-login-password'>Contraseña</InputLabel>
            <OutlinedInput
              label='Contraseña'
              value={values.password}
              id='auth-login-password'
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{errors.password}</FormHelperText>
          </FormControl>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <MuiFormControlLabel control={<Checkbox />} label='Guardar datos de inicio de sesión' />
            <Typography component="a" variant="body2" onClick={(e) => e.preventDefault()}>
              Olvidaste tu contraseña?
            </Typography>
          </Box>
          <Button
            fullWidth
            size='large'
            variant='contained'
            sx={{ marginBottom: 2 }}
            type="submit"
          >
            Login
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ marginRight: 2 }}>
              Nuevo en la plataforma?
            </Typography>
            <Typography
              component="span"
              style={{ fontSize: "20px", color: "green", cursor: "pointer" }}
              onClick={() => setShowRegister(true)}
            >
              Regístrate!
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import { toast, ToastContainer } from 'react-toastify';
import FormHelperText from '@mui/material/FormHelperText';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = ({ onShowLogin }) => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    name: '',
    email: '',
    phone: '',
    lastName: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [prop]: value });
    setErrors({ ...errors, [prop]: validateField(prop, value) });
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        return !value || value.length < 5 ? 'El nombre debe tener al menos 5 caracteres' : '';
      case 'lastName':
        return !value || value.length < 5 ? 'El apellido debe tener al menos 5 caracteres' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Ingresa un correo electrónico válido' : '';
      case 'phone':
        return !/^\d+$/.test(value) ? 'El teléfono solo puede contener números' : '';
      case 'password':
        return value.length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : '';
      default:
        return '';
    }
  };

  const handleFormSubmit = () => {
    const newErrors = {
      name: validateField('name', values.name),
      lastName: validateField('lastName', values.lastName),
      email: validateField('email', values.email),
      phone: validateField('phone', values.phone),
      password: validateField('password', values.password),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      console.log("Usuario registrado", values);
      toast.success('¡Registro exitoso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else {
      toast.error('Por favor completa todos los campos correctamente.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

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
        backgroundImage: 'url(/robotillo.jpeg)', // Imagen de fondo
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
        zIndex: 1,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 4, borderRadius: 2 }}>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
          Comienza la aventura! 🚀
        </Typography>
        <Typography variant='body2'>¡Haz que la gestión de tu aplicación sea fácil y divertida!</Typography>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField
            fullWidth
            label='Nombre de usuario'
            sx={{ marginBottom: 2 }}
            value={values.name}
            onChange={handleChange('name')}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label='Apellido'
            sx={{ marginBottom: 2 }}
            value={values.lastName}
            onChange={handleChange('lastName')}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
          <TextField
            fullWidth
            label='Teléfono'
            sx={{ marginBottom: 2 }}
            value={values.phone}
            onChange={handleChange('phone')}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          <TextField
            fullWidth
            label='Email'
            sx={{ marginBottom: 2 }}
            value={values.email}
            onChange={handleChange('email')}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel htmlFor='auth-register-password'>Contraseña</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.password}
              id='auth-register-password'
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    aria-label='toggle password visibility'
                  >
                    {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
          </FormControl>
          <Button
            fullWidth
            size='large'
            variant='contained'
            onClick={handleFormSubmit}
          >
            Regístrate
          </Button>
        </form>
        <Typography variant='body2' sx={{ marginRight: 2 }}>
          Ya tienes cuenta?
        </Typography>
        <Typography
          component="span"
          style={{ fontSize: "20px", color: "green", cursor: "pointer" }}
          onClick={onShowLogin} // Cambiar el estado para mostrar el login
        >
          Inicia sesión!
        </Typography>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default RegisterPage;

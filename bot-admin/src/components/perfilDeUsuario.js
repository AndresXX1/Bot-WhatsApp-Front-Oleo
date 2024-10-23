import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center',
    },
}));

const PerfilDeUsuario = () => {
    const [imgSrc, setImgSrc] = useState('/images/avatars/1.png');
    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        phone: '',
        country: '',
        address: '',
        age: '',
        gender: '',
    });

    useEffect(() => {
        // Simulando carga de datos del usuario
        const fetchedData = {
            name: 'John',
            lastName: 'Doe',
            phone: '351243952',
            country: 'Argentina',
            address: 'calle falsa 123',
            age: '22',
            gender: 'Hombre',
            image: '/images/avatars/1.png',
        };
        setUserData(fetchedData);
        setImgSrc(fetchedData.image);
    }, []);

    const onChange = (file) => {
        const reader = new FileReader();
        const { files } = file.target;
        if (files && files.length !== 0) {
            reader.onload = () => {
                setImgSrc(reader.result);
                setUserData((prevState) => ({
                    ...prevState,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del usuario a enviar:', userData);
        // Aquí puedes implementar la lógica de actualización de datos
    };

    return (
        <CardContent>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ImgStyled src={imgSrc} alt='Profile Pic' />
                            <Box>
                                <ButtonStyled component='label' variant='contained' htmlFor='upload-image'>
                                    Subir Nueva Foto
                                    <input
                                        hidden
                                        type='file'
                                        onChange={onChange}
                                        id='upload-image'
                                    />
                                </ButtonStyled>
                                <Typography variant='body2' sx={{ marginTop: 1 }}>
                                    PNG o JPEG. Máx. 800K.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label='Nombre'
                            placeholder='John'
                            defaultValue={userData.name}
                            name='name'
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label='Apellido'
                            placeholder='Doe'
                            defaultValue={userData.lastName}
                            name='lastName'
                            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type='phone'
                            label='Teléfono'
                            placeholder='351243952'
                            defaultValue={userData.phone}
                            name='phone'
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>País</InputLabel>
                            <Select
                                label='País'
                                defaultValue={userData.country}
                                name='country'
                                onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                            >
                                <MenuItem value='Argentina'>Argentina</MenuItem>
                                <MenuItem value='Colombia'>Colombia</MenuItem>
                                <MenuItem value='Brasil'>Brasil</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label='Dirección'
                            placeholder='calle falsa 123'
                            defaultValue={userData.address}
                            name='address'
                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type='number'
                            label='Edad'
                            placeholder='22'
                            defaultValue={userData.age}
                            name='age'
                            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Género</InputLabel>
                            <Select
                                label='Género'
                                defaultValue={userData.gender}
                                name='gender'
                                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                            >
                                <MenuItem value='Hombre'>Hombre</MenuItem>
                                <MenuItem value='Mujer'>Mujer</MenuItem>
                                <MenuItem value='Otro'>Otro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
                            Guardar Cambios
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    );
};

export default PerfilDeUsuario;

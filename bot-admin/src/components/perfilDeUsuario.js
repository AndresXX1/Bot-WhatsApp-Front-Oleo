import React, { useState } from 'react';
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
    width: 160, // Aumenta el tamaño aquí
    height: 160, // Aumenta el tamaño aquí
    marginRight: theme.spacing(3), // Aumenta el margen a la derecha
    borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center',
        backgroundColor:"#e8c39e"
    },
}));

const PerfilDeUsuario = () => {
    const [imgSrc, setImgSrc] = useState('/1.png');
    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        phone: '',
        country: '',
        address: '',
        age: '',
        gender: '',
    });

    const onChange = (file) => {
        const reader = new FileReader();
        const { files } = file.target;
        if (files && files.length > 0) {
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
                    <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3,marginRight:"20px" }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ImgStyled src={imgSrc} alt='Profile Pic' />
                            <Box>
                                <Typography variant='body1' sx={{marginLeft: 15,}}>
                            <ButtonStyled
                            component='label'
                            variant='contained'
                            htmlFor='upload-image'
                            sx={{ marginRight: '-20px',backgroundColor:"#e8c39e",color:"black" }} // Usa sx para aplicar el estilo
                        >

                            Subir Nueva Foto
                            <input
                                hidden
                                type='file'
                                accept='image/png, image/jpeg'
                                onChange={onChange}
                                id='upload-image'
                                />
                        </ButtonStyled>
                                </Typography>
                                <Typography variant='body2' sx={{ marginTop: 1, marginLeft: 13 }}>
                                    PNG o JPEG. Máx. 800K.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    {['name', 'lastName', 'phone', 'address', 'age', 'country', 'gender'].map((field, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            {field === 'country' ? (
                                <FormControl fullWidth>
                                    <InputLabel>País</InputLabel>
                                    <Select
                                        label='País'
                                        value={userData.country}
                                        name='country'
                                        onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                                    >
                                        <MenuItem value='Argentina'>Argentina</MenuItem>
                                        <MenuItem value='Colombia'>Colombia</MenuItem>
                                        <MenuItem value='Brasil'>Brasil</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    fullWidth
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    placeholder={field}
                                    value={userData[field]}
                                    name={field}
                                    onChange={(e) => setUserData({ ...userData, [field]: e.target.value })}
                                />
                            )}
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained' sx={{ marginRight: 3.5, backgroundColor: "#e8c39e",color:"black" }}>
                            Guardar Cambios
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    );
};

export default PerfilDeUsuario;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

function App() {
    const [responses, setResponses] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [newResponse, setNewResponse] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener respuestas
                const responsesResult = await axios.get('http://localhost:3000/api/get-responses');
                setResponses(responsesResult.data);

                // Obtener código QR
                const qrResult = await axios.get('http://localhost:3000/api/get-qr');
                if (qrResult.data.qrCode && qrResult.data.qrCode.startsWith('data:image/png;base64,')) {
                    setQrCode(qrResult.data.qrCode);
                } else {
                    setQrCode('https://via.placeholder.com/200'); // Imagen de reemplazo
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                alert('Error fetching data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Configurar actualización periódica cada 4 minutos
        const intervalId = setInterval(fetchData, 50000); // 240000 milisegundos = 4 minutos

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, []);

    const handleOpenDialog = (response) => {
        setSelectedResponse(response);
        setNewResponse(response.response);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedResponse(null);
        setNewResponse('');
    };

    const handleSaveResponse = async () => {
        if (selectedResponse) {
            try {
                await axios.post('http://localhost:3000/api/update-response', {
                    id: selectedResponse._id,
                    newResponse
                });
                setResponses(responses.map(resp =>
                    resp._id === selectedResponse._id ? { ...resp, response: newResponse } : resp
                ));
                handleCloseDialog();
            } catch (error) {
                console.error('Error updating response:', error.message);
                alert('Error updating response: ' + error.message);
            }
        }
    };
//dsads
    return (
      <div style={{
        backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/001/849/587/non_2x/abstract-white-background-free-vector.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Esto asegura que el fondo cubra toda la altura de la ventana
        padding: 20,
        boxSizing: 'border-box' // Esto incluye el padding en el cálculo del tamaño del elemento
    }}>
        <div style={{ padding: 20 }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                
                    <h1>Admin Panel</h1>
                    <div>
                        <h2>QR Code:</h2>
                        {qrCode ? (
                            <img 
                                src={qrCode || 'https://via.placeholder.com/200'} 
                                alt="QR Code" 
                                style={{ width: '200px', height: '200px' }} 
                            /> 
                        ) : <p>No QR Code disponible</p>}
                    
                    </div>
                    <div>
                        <h2>Responses:</h2>
                        <List>
                            {responses.map((response) => (
                                <ListItem key={response._id} onClick={() => handleOpenDialog(response)}>
                                    <ListItemText primary={response.keyword} secondary={response.response} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Edit Response</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="response"
                                label="Response"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={newResponse}
                                onChange={(e) => setNewResponse(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={handleSaveResponse}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </div>
        </div>
    );
}

export default App;
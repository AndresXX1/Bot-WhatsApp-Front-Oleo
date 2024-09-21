import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const BotComponent = () => {
    const [responses, setResponses] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [newResponse, setNewResponse] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsesResult = await axios.get('http://localhost:3000/api/get-responses', {
                    params: { cacheBust: Date.now() }
                });
                const formattedResponses = [];
                responsesResult.data.forEach(response => {
                    formattedResponses.push({ keyword: response.keyword, isBot: false });
                    formattedResponses.push({ response: response.response, isBot: true, _id: response._id, modifiedAt: response.modifiedAt });
                });
                setResponses(formattedResponses);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                alert('Error fetching data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 50000);
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
                
                // Actualiza solo la respuesta modificada en el estado local
                setResponses(prevResponses => {
                    const updatedResponses = [...prevResponses];
                    const index = updatedResponses.findIndex(r => r._id === selectedResponse._id);
                    if (index !== -1) {
                        updatedResponses[index].response = newResponse;
                        updatedResponses[index].modifiedAt = Date.now();
                    }
                    return updatedResponses;
                });
                
                handleCloseDialog();
            } catch (error) {
                console.error('Error updating response:', error.message);
                alert('Error updating response: ' + error.message);
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <h1>Bot Responses</h1>
                    <div style={{
                        width: '400px',
                        height: '640px',
                        borderRadius: '30px',
                        border: '16px solid #333',
                        backgroundImage: 'url("https://i.redd.it/ts7vuoswhwf41.jpg")',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            backgroundColor: '#555555',
                            color: '#fff',
                            padding: '10px',
                            textAlign: 'center',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #ddd'
                        }}>
                            Edit Response Bot
                        </div>
                        <div style={{
                            flex: 1,
                            padding: '10px',
                            borderTop: '1px solid #ddd',
                            overflowY: 'auto'
                        }}>
                            {responses.map((response, index) => (
                                <div key={index} style={{
                                    marginBottom: '10px',
                                    display: 'flex',
                                    justifyContent: response.isBot ? 'flex-start' : 'flex-end'
                                }}>
                                    <div
                                        onClick={() => response.isBot ? handleOpenDialog(response) : null}
                                        style={{
                                            borderRadius: '10px',
                                            padding: '10px',
                                            backgroundColor: response.isBot ? '#e0e0e0' : '#25D366',
                                            color: response.isBot ? '#000' : '#fff',
                                            maxWidth: '70%',
                                            minWidth: '20%',
                                            wordBreak: 'break-word',
                                            cursor: response.isBot ? 'pointer' : 'default',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {response.isBot && (
                                            <EditIcon
                                                style={{
                                                    fontSize: '18px',
                                                    marginRight: '5px'
                                                }}
                                            />
                                        )}
                                        {response.isBot ? response.response : response.keyword}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        fullWidth
                        maxWidth="md"
                    >
                        <DialogTitle>Edit Response</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                multiline
                                rows={4}
                                margin="dense"
                                id="response"
                                label="Response"
                                fullWidth
                                variant="outlined"
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
    );
};

export default BotComponent;
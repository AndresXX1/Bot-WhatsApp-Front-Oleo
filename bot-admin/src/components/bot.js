import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const BotComponent = () => {
    const [intents, setIntents] = useState([]);
    const [selectedIntent, setSelectedIntent] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const intentsResult = await axios.get('https://whatsapp-bot-oleo.onrender.com/api/dialogflow/intents', {
                    params: { cacheBust: Date.now() }
                });
                setIntents(intentsResult.data);
            } catch (error) {
                console.error('Error fetching intents:', error.message);
                alert('Error fetching intents: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 30000);
        return () => clearInterval(intervalId);
    }, []);

    const handleOpenDialog = (intent) => {
        setSelectedIntent(intent);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedIntent(null);
    };

    const handleSaveIntent = async (updatedIntent) => {
        try {
            await axios.put(`https://whatsapp-bot-oleo.onrender.com/api/dialogflow/intents/${selectedIntent.id}`, updatedIntent);
            setIntents(prevIntents => prevIntents.map(intent => intent.id === selectedIntent.id ? updatedIntent : intent));
            handleCloseDialog();
        } catch (error) {
            console.error('Error updating intent:', error.message);
            alert('Error updating intent: ' + error.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <h1>Dialogflow Intents</h1>
                    {intents.map((intent, index) => (
                        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                            <h3>{intent.displayName}</h3>
                            <p><strong>Training Phrases:</strong></p>
                            <ul>
                                {intent.trainingPhrases.map((phrase, idx) => (
                                    <li key={idx}>{phrase}</li>
                                ))}
                            </ul>
                            <p><strong>Response:</strong> {intent.messageTexts.join(', ')}</p>
                            <button onClick={() => handleOpenDialog(intent)}>Edit</button>
                        </div>
                    ))}

                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Edit Intent</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="displayName"
                                label="Display Name"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedIntent?.displayName}
                            />
                            <TextField
                                margin="dense"
                                id="trainingPhrases"
                                label="Training Phrases (comma-separated)"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedIntent?.trainingPhrases.join(',')}
                            />
                            <TextField
                                margin="dense"
                                id="messageTexts"
                                label="Response Texts (comma-separated)"
                                fullWidth
                                variant="outlined"
                                defaultValue={selectedIntent?.messageTexts.join(',')}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={() => {
                                const updatedIntent = {
                                    displayName: document.getElementById('displayName').value,
                                    trainingPhrases: document.getElementById('trainingPhrases').value.split(','),
                                    messageTexts: document.getElementById('messageTexts').value.split(',')
                                };
                                handleSaveIntent(updatedIntent);
                            }}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </div>
    );
};

export default BotComponent;
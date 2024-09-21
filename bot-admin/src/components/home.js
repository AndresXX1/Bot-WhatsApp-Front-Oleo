import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const QRCodeComponent = () => {
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const qrResult = await axios.get('https://whatsapp-bot-cocina-oleo-back.onrender.com/api/get-qr');
                
                // Verificamos que el QR es base64
                if (qrResult.data.qrCode && qrResult.data.qrCode.startsWith('data:image/png;base64,')) {
                    // Solo actualiza si el QR ha cambiado
                    if (qrResult.data.qrCode !== qrCode) {
                        setQrCode(qrResult.data.qrCode);
                    }
                } else {
                    setQrCode('https://via.placeholder.com/300');
                }
            } catch (error) {
                console.error('Error fetching QR code:', error.message);
                setQrCode('https://via.placeholder.com/300');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 50000); // 50 segundos en lugar de 2 segundos
        return () => clearInterval(intervalId);
    }, [qrCode]);

    return (
        <div>
            <h1>QR Code</h1>
            <div style={{ marginLeft: "200px" }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {qrCode ? (
                            <img 
                                src={qrCode} // Aquí usamos directamente la cadena base64 sin timestamp
                                alt="QR Code" 
                                style={{ width: '300px', height: '300px' }} 
                            />
                        ) : <p>No QR Code disponible</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default QRCodeComponent;

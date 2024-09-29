import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react'; // Cambiamos la importación a QRCodeCanvas

const QRCodeComponent = () => {
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const qrResult = await axios.get('https://whatsapp-bot-cocina-oleo-back.onrender.com/api/get-qr');
                
                // Si el QR llega como texto, lo guardamos
                if (qrResult.data.qrCode) {
                    setQrCode(qrResult.data.qrCode);
                } else {
                    setQrCode('');
                }
            } catch (error) {
                console.error('Error fetching QR code:', error.message);
                setQrCode('');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 50000); // 50 segundos en lugar de 2 segundos
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1>QR Code</h1>
            <div style={{ marginLeft: "200px" }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {qrCode ? (
                            <QRCodeCanvas 
                                value={qrCode} // Usamos el texto recibido para generar el QR
                                size={300} // Tamaño del QR
                            />
                        ) : <p>No QR Code disponible</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default QRCodeComponent;

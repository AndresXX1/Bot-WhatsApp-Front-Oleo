import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/reservas.css';  // Importa el archivo CSS

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editableReserva, setEditableReserva] = useState(null);
    const [editableReservaValues, setEditableReservaValues] = useState({});

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await fetch('https://whatsapp-bot-oleo.onrender.com/api/reservas');
                if (!response.ok) {
                    throw new Error('Error al obtener las reservas');
                }
                const data = await response.json();
                setReservas(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, []);

    const handleEdit = (reservaId) => {
        setEditableReserva(reservaId);
        setEditableReservaValues((prevValues) => ({
            ...prevValues,
            [reservaId]: { ...reservas.find((reserva) => reserva._id === reservaId) },
        }));
    };

    const handleCancel = () => {
        setEditableReserva(null);
        setEditableReservaValues({});
    };

    const handleSave = async (reservaId) => {
        if (window.confirm('¿Estás seguro de que quieres guardar los cambios?')) {
            try {
                const reservaData = editableReservaValues[reservaId];
                const response = await fetch(`https://whatsapp-bot-oleo.onrender.com/api/reservas/${reservaId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservaData),
                });
                if (!response.ok) {
                    throw new Error('Error al actualizar la reserva');
                }
                const updatedReserva = await response.json();
                setReservas((prev) => prev.map((reserva) => (reserva._id === reservaId ? updatedReserva.reserva : reserva)));
                handleCancel();
            } catch (error) {
                console.error('Error updating reserva:', error);
            }
        }
    };

    const handleDelete = async (reservaId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
            try {
                const response = await fetch(`https://whatsapp-bot-oleo.onrender.com/api/reservas/${reservaId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar la reserva');
                }
                setReservas((prev) => prev.filter((reserva) => reserva._id !== reservaId));
            } catch (error) {
                console.error('Error deleting reserva:', error);
            }
        }
    };

    const handleInputChange = (reservaId, field, value) => {
        setEditableReservaValues((prevValues) => ({
            ...prevValues,
            [reservaId]: {
                ...prevValues[reservaId],
                [field]: value,
            },
        }));
    };

    if (loading) return <Typography variant="h6" style={{ marginBottom: "20px", color: '#e8c39e' }}>Cargando reservas...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    return (
        <div className="reservas-container">
            <Typography 
                variant="h4" 
                style={{ marginBottom: "20px", color: '#e8c39e' }} // Aplica el color amarillo aquí
            >
                Reservas
            </Typography>
            <TableContainer component={Paper} className="table-container" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 2 }}>
                <Table className="reservas-table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Hora</TableCell>
                            <TableCell align="center">Número de Personas</TableCell>
                            <TableCell align="center">Comentario</TableCell>
                            <TableCell align="center">Confirmada</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservas.map((reserva) => (
                            <TableRow key={reserva._id}>
                                <TableCell align="center">
                                    {editableReserva === reserva._id ? (
                                        <TextField
                                            className="edit-input"
                                            value={editableReservaValues[reserva._id]?.nombre || ''}
                                            onChange={(e) => handleInputChange(reserva._id, 'nombre', e.target.value)}
                                        />
                                    ) : (
                                        reserva.nombre
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editableReserva === reserva._id ? (
                                        <TextField
                                            type="date"
                                            className="edit-input"
                                            value={new Date(editableReservaValues[reserva._id]?.fecha).toISOString().split('T')[0]}
                                            onChange={(e) => handleInputChange(reserva._id, 'fecha', new Date(e.target.value).toISOString())}
                                        />
                                    ) : (
                                        new Date(reserva.fecha).toLocaleDateString()
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editableReserva === reserva._id ? (
                                        <TextField
                                            className="edit-input"
                                            value={editableReservaValues[reserva._id]?.hora || ''}
                                            onChange={(e) => handleInputChange(reserva._id, 'hora', e.target.value)}
                                        />
                                    ) : (
                                        reserva.hora
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editableReserva === reserva._id ? (
                                        <TextField
                                            type="number"
                                            className="edit-input"
                                            value={editableReservaValues[reserva._id]?.numeroPersonas || ''}
                                            onChange={(e) => handleInputChange(reserva._id, 'numeroPersonas', e.target.value)}
                                        />
                                    ) : (
                                        reserva.numeroPersonas
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editableReserva === reserva._id ? (
                                        <TextField
                                            className="edit-input"
                                            value={editableReservaValues[reserva._id]?.comentario || ''}
                                            onChange={(e) => handleInputChange(reserva._id, 'comentario', e.target.value)}
                                        />
                                    ) : (
                                        reserva.comentario
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editableReserva === reserva._id ? (
                                        <select
                                            className="edit-input"
                                            value={editableReservaValues[reserva._id]?.confirmada ? 'Sí' : 'No'}
                                            onChange={(e) => handleInputChange(reserva._id, 'confirmada', e.target.value === 'Sí')}
                                        >
                                            <option value="Sí">Sí</option>
                                            <option value="No">No</option>
                                        </select>
                                    ) : (
                                        (reserva.confirmada ? 'Sí' : 'No')
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <div className="actions">
                                        {editableReserva === reserva._id ? (
                                            <>
                                                <Button onClick={() => handleCancel()}><CancelIcon /></Button>
                                                <Button onClick={() => handleSave(reserva._id)}><SaveIcon /></Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button onClick={() => handleEdit(reserva._id)}><EditIcon /></Button>
                                                <Button onClick={() => handleDelete(reserva._id)}><DeleteIcon /></Button>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Reservas;

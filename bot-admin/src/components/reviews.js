import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Rating } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [editableReview, setEditableReview] = useState(null);
    const [editableReviewValues, setEditableReviewValues] = useState({});

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('https://whatsapp-bot-oleo.onrender.com/api/reviews', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setReviews(data);
                } else {
                    console.error('Error al obtener reseñas:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener reseñas:', error);
            }
        };

        fetchReviews();
    }, []);

    const handleEdit = (reviewId) => {
        setEditableReview(reviewId);
        setEditableReviewValues((prevValues) => ({
            ...prevValues,
            [reviewId]: { ...reviews.find((review) => review._id === reviewId) },
        }));
    };

    const handleCancel = () => {
        setEditableReview(null);
        setEditableReviewValues({});
    };

    const handleSave = async (reviewId) => {
        const reviewData = editableReviewValues[reviewId];
        console.log("Attempting to save review:", reviewId, reviewData); // Log para ver qué se está intentando guardar
    
        try {
            const response = await fetch(`https://whatsapp-bot-oleo.onrender.com/api/reviews/${reviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({ comentario: reviewData.comentario }),
            });
    
            console.log("Response status:", response.status); // Log para ver el estado de la respuesta
    
            if (response.ok) {
                const updatedReview = await response.json();
                // Actualiza la lista de reseñas en el estado
                setReviews((prevReviews) => 
                    prevReviews.map((review) => (review._id === reviewId ? updatedReview.review : review))
                );
                console.log("Review updated successfully:", updatedReview); // Log de éxito
            } else {
                console.error('Error al actualizar la reseña:', response.statusText);
                const errorResponse = await response.json();
                console.error('Error details:', errorResponse); // Log de detalles del error
            }
        } catch (error) {
            console.error('Error al actualizar la reseña:', error);
        }
        handleCancel();
    };

    const handleInputChange = (reviewId, field, value) => {
        setEditableReviewValues((prevValues) => ({
            ...prevValues,
            [reviewId]: {
                ...prevValues[reviewId],
                [field]: value,
            },
        }));
    };

    return (
        <div className="reviews-container">
            <Typography variant="h4" style={{ marginBottom: "20px", color: '#e8c39e' }}>
                Reseñas
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#0a3a3a', color: '#ffffff' }}>
                            <TableCell align="center" sx={{ color: 'white' }}>Nombre</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Apellido</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Calificación</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Comentario</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Fecha</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews?.map((review) => (
                            <TableRow key={review._id}>
                                <TableCell align="center">{review.nombre}</TableCell>
                                <TableCell align="center">{review.apellido}</TableCell>
                                <TableCell align="center">
                                    {editableReview === review._id ? (
                                        <Rating
                                            value={editableReviewValues[review._id]?.calificacion || 0}
                                            onChange={(e, newValue) => handleInputChange(review._id, 'calificacion', newValue)}
                                        />
                                    ) : (
                                        <Rating value={review.calificacion} readOnly />
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editableReview === review._id ? (
                                        <TextField
                                            style={{ width: '100%' }}
                                            multiline
                                            value={editableReviewValues[review._id]?.comentario || ''}
                                            onChange={(e) => handleInputChange(review._id, 'comentario', e.target.value)}
                                        />
                                    ) : (
                                        review.comentario
                                    )}
                                </TableCell>
                                <TableCell align="center">{new Date(review.fechaCreacion).toLocaleDateString()}</TableCell>
                                <TableCell align="center">
                                    <div className="actions">
                                        {editableReview === review._id ? (
                                            <>
                                                <Button onClick={handleCancel}><CancelIcon /></Button>
                                                <Button onClick={() => handleSave(review._id)}><SaveIcon /></Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button onClick={() => handleEdit(review._id)}><EditIcon /></Button>
                                             
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

export default Reviews;

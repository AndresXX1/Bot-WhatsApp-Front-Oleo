import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/pedidos.css';  // Importa el archivo CSS

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editablePedido, setEditablePedido] = useState(null);
    const [editablePedidoValues, setEditablePedidoValues] = useState({});

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch('https://whatsapp-bot-oleo.onrender.com/api/pedidos');
                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos');
                }
                const data = await response.json();
                setPedidos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    const handleEdit = (pedidoId) => {
        setEditablePedido(pedidoId);
        setEditablePedidoValues((prevValues) => ({
            ...prevValues,
            [pedidoId]: { ...pedidos.find((pedido) => pedido._id === pedidoId) },
        }));
    };

    const handleCancel = () => {
        setEditablePedido(null);
        setEditablePedidoValues({});
    };

    const handleSave = async (pedidoId) => {
        if (window.confirm('¿Estás seguro de que quieres guardar los cambios?')) {
            try {
                const pedidoData = editablePedidoValues[pedidoId];
                const response = await fetch(`https://whatsapp-bot-oleo.onrender.com/api/pedidos/${pedidoId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pedidoData),
                });
                if (!response.ok) {
                    throw new Error('Error al actualizar el pedido');
                }
                const updatedPedido = await response.json();
                setPedidos((prev) => prev.map((pedido) => (pedido._id === pedidoId ? updatedPedido.pedido : pedido)));
                handleCancel();
            } catch (error) {
                console.error('Error updating pedido:', error);
            }
        }
    };

    const handleDelete = async (pedidoId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este pedido?')) {
            try {
                const response = await fetch(`https://whatsapp-bot-oleo.onrender.com/api/pedidos/${pedidoId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar el pedido');
                }
                setPedidos((prev) => prev.filter((pedido) => pedido._id !== pedidoId));
            } catch (error) {
                console.error('Error deleting pedido:', error);
            }
        }
    };

    const handleInputChange = (pedidoId, field, value) => {
        setEditablePedidoValues((prevValues) => ({
            ...prevValues,
            [pedidoId]: {
                ...prevValues[pedidoId],
                [field]: value,
            },
        }));
    };

    if (loading) return <Typography variant="h6">Cargando pedidos...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    return (
        <div className="pedidos-container">
            <Typography variant="h4" style={{marginBottom:"20px"}}>Pedidos</Typography>
            <TableContainer component={Paper} className="table-container">
                <Table className="pedidos-table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Apellido</TableCell>
                            <TableCell align="center">Pedido</TableCell>
                            <TableCell align="center">Método de Entrega</TableCell>
                            <TableCell align="center">Dirección</TableCell>
                            <TableCell align="center">Método de Pago</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pedidos.map((pedido) => (
                            <TableRow key={pedido._id}>
                                <TableCell align="center">
                                    {editablePedido === pedido._id ? (
                                        <TextField
                                            style={{ width: '120px' }} // Aumentado a 170px
                                            value={editablePedidoValues[pedido._id]?.nombre || ''}
                                            onChange={(e) => handleInputChange(pedido._id, 'nombre', e.target.value)}
                                        />
                                    ) : (
                                        pedido.nombre
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editablePedido === pedido._id ? (
                                        <TextField
                                            style={{ width: '120px' }} // Aumentado a 170px
                                            value={editablePedidoValues[pedido._id]?.apellido || ''}
                                            onChange={(e) => handleInputChange(pedido._id, 'apellido', e.target.value)}
                                        />
                                    ) : (
                                        pedido.apellido
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editablePedido === pedido._id ? (
                                        <TextField
                                            style={{ width: '120px' }} // Aumentado a 170px
                                            value={editablePedidoValues[pedido._id]?.pedido || ''}
                                            onChange={(e) => handleInputChange(pedido._id, 'pedido', e.target.value)}
                                        />
                                    ) : (
                                        pedido.pedido
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                  {editablePedido === pedido._id ? (
                                      <FormControl fullWidth>
                                          <InputLabel id={`metodo-entrega-label-${pedido._id}`}>Método de Entrega</InputLabel>
                                          <Select
                                              style={{ width: '120px' }} // Ancho consistente
                                              labelId={`metodo-entrega-label-${pedido._id}`}
                                              value={editablePedidoValues[pedido._id]?.metodo_entrega || pedido.metodo_entrega} // Verifica el valor
                                              onChange={(e) => handleInputChange(pedido._id, 'metodo_entrega', e.target.value)}
                                          >
                                              <MenuItem value="delivery">Delivery</MenuItem>
                                              <MenuItem value="recogida">Recogida</MenuItem>
                                          </Select>
                                      </FormControl>
                                  ) : (
                                      pedido.metodo_entrega
                                  )}
                              </TableCell>

                                <TableCell align="center">
                                    {editablePedido === pedido._id ? (
                                        <TextField
                                            style={{ width: '90px' }} // Aumentado a 170px
                                            value={editablePedidoValues[pedido._id]?.direccion || ''}
                                            onChange={(e) => handleInputChange(pedido._id, 'direccion', e.target.value)}
                                        />
                                    ) : (
                                        pedido.direccion
                                    )}
                                </TableCell>
                                <TableCell align="center">
    {editablePedido === pedido._id ? (
        <FormControl fullWidth>
            <InputLabel id={`metodo-pago-label-${pedido._id}`}>Método de Pago</InputLabel>
            <Select
                style={{ width: '120px' }} // Ancho consistente
                labelId={`metodo-pago-label-${pedido._id}`}
                value={editablePedidoValues[pedido._id]?.metodo_pago || pedido.metodo_pago} // Verifica el valor
                onChange={(e) => handleInputChange(pedido._id, 'metodo_pago', e.target.value)}
            >
                <MenuItem value="efectivo">Efectivo</MenuItem>
                <MenuItem value="tarjeta">Tarjeta</MenuItem>
            </Select>
        </FormControl>
    ) : (
        pedido.metodo_pago
    )}
</TableCell>
                                <TableCell align="center">
                                    {editablePedido === pedido._id ? (
                                        <FormControl fullWidth>
                                            <InputLabel id={`estado-label-${pedido._id}`}>Estado</InputLabel>
                                            <Select
                                                style={{ width: '120px' }} // Aumentado a 170px
                                                labelId={`estado-label-${pedido._id}`}
                                                value={editablePedidoValues[pedido._id]?.estado || ''}
                                                onChange={(e) => handleInputChange(pedido._id, 'estado', e.target.value)}
                                            >
                                                <MenuItem value="Pendiente">Pendiente</MenuItem>
                                                <MenuItem value="Confirmado">Confirmado</MenuItem>
                                                <MenuItem value="Cancelado">Cancelado</MenuItem>
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        pedido.estado
                                    )}
                                </TableCell>
                                <TableCell align="center">
    <div className="actions">
        {editablePedido === pedido._id ? (
            <>
                <Button onClick={() => handleCancel()} ><CancelIcon /></Button>
                <Button onClick={() => handleSave(pedido._id)} ><SaveIcon /></Button>
            </>
        ) : (
            <>
                <Button onClick={() => handleEdit(pedido._id)} ><EditIcon /></Button>
                <Button onClick={() => handleDelete(pedido._id)} ><DeleteIcon /></Button>
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

export default Pedidos;

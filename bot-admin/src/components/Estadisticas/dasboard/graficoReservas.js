import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.css'; 
import { Chart, LinearScale, CategoryScale, LineController, PointElement, LineElement } from 'chart.js';

const ReservasChart = () => {
    // Datos para el gráfico
    const data = {
       labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
       datasets: [
         {
           label: 'Reservas',
           data: [12, 19, 3, 5, 2, 3, 8, 10, 15, 20, 25, 30],
           borderColor: '#1E90FF',
           fill: false,
         },
       ],
    };
    Chart.register(LinearScale, CategoryScale, LineController, PointElement, LineElement);
   
    // Opciones para el gráfico
    const options = {
       responsive: true,
       scales: {
         y: {
           beginAtZero: true,
         },
       },
    };
   
    return (
       <Card>
         <CardContent>
           <Typography variant="h6" component="div" gutterBottom>
             Reservas por mes
           </Typography>
           <div style={{ width: '100%', height: '400px' }}>
             <Line data={data} options={options} />
           </div>
         </CardContent>
       </Card>
    );
   };
   
   export default ReservasChart;
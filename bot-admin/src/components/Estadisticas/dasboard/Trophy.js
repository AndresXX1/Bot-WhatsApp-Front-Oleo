import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { styled, useTheme } from '@mui/material/styles';

Chart.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

const TrophyImg = styled('img')({
 height: "50px", // Ajusta el tamaño de la imagen según sea necesario
 margin: "auto", // Centra la imagen horizontalmente
});

const ReservasChart = () => {
 const data = {
    labels: ['Sala de Conferencias Piso 1', 'Homework Piso 3', 'Oficina 2', 'Oficina 3', 'Oficina 4'],
    datasets: [
      {
        data: [50, 30, 20, 10, 5],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ]
 };

 const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: 70 
 };

 return (
    <Card sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <CardContent>
        <Typography variant='h6' textAlign="center">Ranking de reservas 🥳</Typography>
        <Box sx={{ position: 'relative', width: '100%', height: '200px', marginTop: "40px", marginBottom: "40px", marginLeft:"20px" }}>
          <Pie data={data} options={options} />
        
        </Box>
        <Box sx={{marginTop:"-160px", position:"absolute",marginLeft:"100px"}}>
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
        </Box>
        <Box>
        <Typography textAlign="center" variant="body1" component="div" gutterBottom>
          <span style={{ color: '#FF6384', borderBottom: "1px solid white" }}>Sala de Conferencias Piso 1</span><br />
          <span style={{ color: '#36A2EB' }}>Homework Piso 3</span><br />
          <span style={{ color: '#FFCE56' }}>Oficina 2</span><br />
          <span style={{ color: '#4BC0C0' }}>Oficina 3</span><br />
          <span style={{ color: '#9966FF' }}>Oficina 4</span>
        </Typography>
        </Box>
      </CardContent>
    </Card>
 );
};

export default ReservasChart;
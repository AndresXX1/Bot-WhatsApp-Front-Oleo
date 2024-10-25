import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';

// Localización de moment a español
moment.locale('es');

const localizer = momentLocalizer(moment);

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d9',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ReservationCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredReservation, setHoveredReservation] = useState(null);

  useEffect(() => {
    // Aquí puedes cargar los eventos si es necesario
  }, []);

  const dayPropGetter = (date) => {
    const currentMonth = moment().month();
    const month = moment(date).month();
    const year = moment().year();
    const dateYear = moment(date).year();

    if (month < currentMonth || (month === currentMonth && dateYear < year)) {
      return {
        style: {
          backgroundColor: 'transparent',
        },
      };
    } else if (month > currentMonth || (month === currentMonth && dateYear > year)) {
      return {
        style: {
          backgroundColor: 'transparent',
        },
      };
    }

    return {};
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    if (event.title) {
      return {
        style: {
          backgroundColor: event.color,
          borderRadius: '50%',
          height: '11px',
          width: '11px',
          margin: 'auto',
          cursor: 'pointer',
          backgroundColor: "salmon"
        },
      };
    } else {
      return {};
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Card sx={{ backgroundColor: '#f5f5f5', padding: '20px' }}> {/* Color de fondo del Card */}
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 470 }}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          onSelectEvent={handleSelectEvent}
          views={['agenda', "month"]}
        />

        {hoveredReservation && (
          <div style={{ position: 'absolute', top: hoveredReservation.y, left: hoveredReservation.x, backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', padding: '5px', borderRadius: '5px' }}>
            <div>{hoveredReservation.title}</div>
            <div>{moment(hoveredReservation.start).format('DD/MM/YYYY')} - {moment(hoveredReservation.end).format('DD/MM/YYYY')}</div>
          </div>
        )}
        <style>{`
          .outside-month-day, .outside-month-day-next {
            background-color: red !important;
            color: red !important;
          }

          .rbc-today {
            background-color: #36A2EB !important;
            color: re !important;
          }

          .rbc-btn-group > button {
            color: #36A2EB !important;
          }
        `}</style>
        <ThemeProvider theme={theme}>
          <Modal
            open={modalIsOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                color: "black",
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              {selectedEvent && (
                <>
                  <h2 style={{ marginBottom: '20px' }}>Detalles de la Reserva</h2>
                  <div style={{ marginBottom: '20px' }}>
                    <p>Título: {selectedEvent.title}</p>
                    <p>Inicio: {moment(selectedEvent.start).format('DD/MM/YYYY HH:mm')}</p>
                    <p>Fin: {moment(selectedEvent.end).format('DD/MM/YYYY HH:mm')}</p>
                    <p>Usuario:</p>
                    <p>Oficina:</p>
                  </div>
                </>
              )}
              <button style={{
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '16px',
                marginLeft: "130px"
              }} onClick={closeModal}>X</button>
            </Box>
          </Modal>
        </ThemeProvider>
      </div>
    </Card>
  );
};

export default ReservationCalendar;

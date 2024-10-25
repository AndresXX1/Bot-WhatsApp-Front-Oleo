import { styled } from '@mui/material/styles'

const ApexChartWrapper = styled('div')(({ theme }) => ({
 '& .apexcharts-canvas': {
    "& line[stroke='transparent']": {
      display: 'none'
    },
    '& .apexcharts-xaxis > line, & .apexcharts-yaxis > line': {
      stroke: '#0074D9' // Color azul claro
    },
    '& .apexcharts-xaxis-tick, & .apexcharts-yaxis-tick': {
      stroke: '#0074D9' // Color azul claro
    },
    '& .apexcharts-tooltip': {
      boxShadow: theme.shadows[3],
      borderColor: '#0074D9', // Color azul claro
      background: '#0074D9', // Color azul claro
      '& .apexcharts-tooltip-title': {
        fontWeight: 600,
        borderColor: '#0074D9', // Color azul claro
        background: '#0074D9', // Color azul claro
      },
      '&.apexcharts-theme-dark': {
        '& .apexcharts-tooltip-text-label, & .apexcharts-tooltip-text-value': {
          color: theme.palette.common.white
        }
      },
      '& .bar-chart': {
        padding: theme.spacing(2, 2.5)
      }
    },
    '& .apexcharts-xaxistooltip': {
      borderColor: '#0074D9', // Color azul claro
      background: '#0074D9', // Color azul claro
      '& .apexcharts-xaxistooltip-text': {
        color: theme.palette.common.white
      },
      '&:after': {
        borderBottomColor: '#0074D9', // Color azul claro
      },
      '&:before': {
        borderBottomColor: '#0074D9', // Color azul claro
      }
    },
    '& .apexcharts-yaxistooltip': {
      borderColor: '#0074D9', // Color azul claro
      background: '#0074D9', // Color azul claro
      '& .apexcharts-yaxistooltip-text': {
        color: theme.palette.common.white
      },
      '&:after': {
        borderLeftColor: '#0074D9', // Color azul claro
      },
      '&:before': {
        borderLeftColor: '#0074D9', // Color azul claro
      }
    },
    '& .apexcharts-text, & .apexcharts-tooltip-text, & .apexcharts-datalabel-label, & .apexcharts-datalabel': {
      filter: 'none',
      fontWeight: 400,
      fill: theme.palette.common.white, // Color blanco para el texto
      fontFamily: `${theme.typography.fontFamily} !important`
    },
    '& .apexcharts-pie-label': {
      filter: 'none',
      fill: theme.palette.common.white // Color blanco para el texto
    },
    '& .apexcharts-pie': {
      '& .apexcharts-datalabel-label, .apexcharts-datalabel-value': {
        fontSize: '1.5rem'
      }
    },
    '& .apexcharts-marker': {
      boxShadow: 'none'
    },
    '& .apexcharts-legend-series': {
      margin: `${theme.spacing(0.75, 2)} !important`,
      '& .apexcharts-legend-text': {
        marginLeft: theme.spacing(0.75),
        color: `${theme.palette.text.primary} !important`
      }
    },
    '& .apexcharts-xcrosshairs, & .apexcharts-ycrosshairs, & .apexcharts-gridline': {
      stroke: '#0074D9', // Color azul claro
    },
    '& .apexcharts-heatmap-rect': {
      stroke: '#0074D9', // Color azul claro
    },
    '& .apexcharts-radialbar > g > g:first-of-type .apexcharts-radialbar-area': {
      stroke: '#0074D9', // Color azul claro
    },
    '& .apexcharts-radar-series polygon': {
      stroke: '#0074D9', // Color azul claro
      fill: '#0074D9', // Color azul claro
    },
    '& .apexcharts-radar-series line': {
      stroke: '#0074D9', // Color azul claro
    }
 }
}))

export default ApexChartWrapper
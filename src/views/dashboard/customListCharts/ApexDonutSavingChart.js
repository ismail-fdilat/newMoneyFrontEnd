import Chart from 'react-apexcharts'
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'

const ApexRadiarChart = () => {
  const donutColors = {
    series1: '#202B61',
    series2: '#88B3DB',
    series3: '#389BF7',

    series4: '#C7F2FF'
  }
  const options = {
    legend: {
      show: true,
      position: 'bottom'
    },
    labels: ['NYC Aid', 'NYSERDA', 'PACE', 'RECs'],

    colors: [donutColors.series1, donutColors.series2, donutColors.series3, donutColors.series4],
    dataLabels: {
      enabled: true,
      formatter(val, opt) {
        return `${parseInt(val)}%`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val) {
                return `${parseInt(val)}%`
              }
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: 'Operational',
              formatter(w) {
                return '31%'
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  const series = [85, 16, 50, 30]

  return (
    <Card style={{
      backgroundColor: '#F8F8F8',
      borderColor: '#F8F8F8'
    }}>
      <CardHeader>
        <div>
          <CardTitle className='mb-75' tag='h4'>
            Expected Savings
          </CardTitle>
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='donut' height={350} />
      </CardBody>
    </Card>
  )
}

export default ApexRadiarChart

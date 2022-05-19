import Chart from 'react-apexcharts'
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'
import { useState, useEffect } from 'react'
const getData = async () => {

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  let data = null

  await fetch("http://localhost:9090/api/emporia?scale=1Y&duration=109500", requestOptions)
    .then(response => response.text()).then(result => { data = result })
    .catch(error => console.log('error', error))
  // console.log(data)
  return data
}
const ApexRadiarChart = () => {
  const [data, setData] = useState([])
  const donutColors = {
    series1: '#EB5757',
    series2: '#FFD6D6',
    series3: '#8E0000'
  }
  const options = {
    legend: {
      show: true,
      position: 'bottom'
    },
    labels: ['Electricity', 'Retrofit', 'Penalties'],

    colors: [donutColors.series1, donutColors.series2, donutColors.series3],
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
                return `$${parseInt(val)}`
              }
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: 'Costs',
              formatter(w) {
                return `$`
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
  useEffect(async () => {
    const data = await getData()
    console.log(data)
    data ? setData(JSON.parse(data)) : setData([])

  }, [])
  const series = [data[0] ? data[0].usage * 0.22 : 0, 1000, data[0] ? ((data[0].usage * 0.000288962) - 5) * 268 : 0]

  return (
    <Card style={{
      backgroundColor: '#F8F8F8',
      borderColor: '#F8F8F8'
    }}>
      <CardHeader>
        <div>
          <CardTitle className='mb-75' tag='h4'>
            Costs
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

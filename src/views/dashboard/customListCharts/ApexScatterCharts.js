import { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { Card, CardHeader, CardTitle, CardBody, ButtonGroup, Button } from 'reactstrap'
const getData = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  let data = null

  await fetch("http://localhost:9090/api/emporia?scale=1MIN&duration=1", requestOptions)
    .then(response => response.text()).then(result => { data = result })
    .catch(error => console.log('error', error))
  // console.log(data)
  return data
}
const ApexScatterCharts = ({ direction, warning, primary, success }) => {
  const [data, setData] = useState([])
  const defaultCat = [
    '7/13',
    '8/12',
    '9/12',
    '10/12',
    '11/12',
    '12/12',
    '13/12',
    '14/12',
    '15/12',
    '16/12',
    '17/12',
    '18/12',
    '19/12',
    '20/12',
    '21/12'
  ]
  const DateFormater = (date) => {
    date = new Date(date)
    const dd = String(date.getDate()).padStart(2, '0')
    const hh = date.getHours()
    const min = date.getMinutes()
    return `${hh}:${min}`
  }
  const options = {
    chart: {
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        }
      },

      parentHeightOffset: 0


    },

    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      strokeColors: ['#fff'],
      colors: [warning]
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      curve: 'smooth',
      colors: undefined,
      width: 2,
      dashArray: 0
    },
    colors: [warning],
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      custom(data) {
        return `<div class='px-1 py-50'>
              <span >${data.series[data.seriesIndex][data.dataPointIndex]}g</span>
            </div>`
      }
    },
    xaxis: {
      categories: data ? data.slice(30).map((data) => DateFormater(data.date)) : defaultCat,
      tickPlacement: 'on',
      style: {
        colors: [],
        fontSize: '3px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 400,
        cssClass: 'apexcharts-yaxis-label'
      }
    },
    noData: {
      text: "no data",
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
        fontFamily: undefined
      }
    },
    zoom: {
      enabled: true,
      type: 'x',
      resetIcon: {
        offsetX: -10,
        offsetY: 0,
        fillColor: '#fff',
        strokeColor: '#37474F'
      },
      selection: {
        background: '#90CAF9',
        border: '#0D47A1'
      }
    },
    yaxis: {
      labels: {
        show: true,
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [],
          fontSize: '8px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-yaxis-label'
        }

        // formatter: (value) => { return value }
      },
      opposite: direction === 'rtl'
    },
    colors: ["#DC143C"],
    markers: {
      size: 7,
      strokeWidth: 1,
      strokeOpacity: 0.9,
      hover: {
        sizeOffset: 6
      }
    }
  }

  console.log(data)
  const series = [
    {
      data: data ? data.map((data) => { return ((data.usage * 0.000288962) * 1000 * 1000).toFixed(2) }).slice(-30) : []
      // data: defaultData
    }
  ]
  const MINUTE_MS = 60000

  useEffect(async () => {
    const data = await getData()
    console.log(data)
    data ? setData(JSON.parse(data)) : setData([])
    const interval = setInterval(async () => {
      const data = await getData()
      console.log(data)
      data ? setData(JSON.parse(data)) : setData([])
    }, MINUTE_MS)
    return () => clearInterval(interval)

  }, [])

  return (
    <Card style={{
      backgroundColor: '#F8F8F8',
      borderColor: '#F8F8F8'
    }}>
      <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
        <CardTitle tag='h4'>Real Time CO2 Emissions(g/min)</CardTitle>

      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='line' height={400} />
      </CardBody>
    </Card>
  )
}

export default ApexScatterCharts

import Chart from 'react-apexcharts'
import { useState, useEffect } from 'react'
import { ArrowDown } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, ButtonGroup, Button, CardSubtitle, Badge } from 'reactstrap'
const getData = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  let data = null

  await fetch("http://localhost:9090/api/emporia?scale=1D&duration=168", requestOptions)
    .then(response => response.text()).then(result => { data = result })
    .catch(error => console.log('error', error))
  // console.log(data)
  return data
}
const getWeeklyData = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  let data = null

  await fetch("http://localhost:9090/api/emporia?scale=1W&duration=1008", requestOptions)
    .then(response => response.text()).then(result => { data = result })
    .catch(error => console.log('error', error))
  // console.log(data)
  return data
}
const getMonthlyData = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  let data = null

  await fetch("http://localhost:9090/api/emporia?scale=1MON&duration=9000", requestOptions)
    .then(response => response.text()).then(result => { data = result })
    .catch(error => console.log('error', error))
  // console.log(data)
  return data
}
const getYearlyData = async () => {
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

const ApexLineChart = ({ direction, warning, primary }) => {
  const [active, setActive] = useState('Daily')

  const [limit, setLimit] = useState(1)
  const [data, setData] = useState(null)
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
    const mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = date.getFullYear()
    return `${mm}/${dd}/${yyyy}`
  }
  const options = {
    chart: {

      zoom: {
        enabled: false
      },
      parentHeightOffset: 0,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      }
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
      width: 5,
      curve: 'straight'
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
              <span>${data.series[data.seriesIndex][data.dataPointIndex]}(tons)</span>
            </div>`
      }
    },
    noData: {
      text: "Data loading",
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
    xaxis: {
      categories: data ? data.map((data) => DateFormater(data.date)) : defaultCat
    },

    yaxis: {
      opposite: direction === 'rtl'
    },
    colors: [primary, "#DC143C"],
    markers: {
      size: 0
    }
  }

  useEffect(async () => {
    let data = null
    data = await getData()
    if (active === 'Daily') {
      setData([])
      setLimit(365)
      data = await getData()
    }
    if (active === 'Yearly') {
      setData([])

      setLimit(1)
      data = await getYearlyData()
    } if (active === 'Monthly') {
      setData([])

      setLimit(12)
      data = await getMonthlyData()
    } if (active === 'Weekly') {
      setData([])

      setLimit(72)
      data = await getWeeklyData()
    }
    console.log(data)
    setData(JSON.parse(data))
  }, [active])

  const series = [
    {
      name: "Carbon emition",
      data: data ? data.map((data) => (data.usage * 0.000288962).toFixed(4)) : []
    },
    {
      name: "Carbon limit",
      data: data ? data.map(() => ((0.00846 * 70000) / limit).toFixed(4)) : []
    }
  ]

  return (
    <Card style={{
      backgroundColor: '#F8F8F8',
      borderColor: '#F8F8F8'
    }}>
      <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>

        <CardTitle className='mb-75' tag='h4'>
          {active} CO2 Emmissions(ton)
        </CardTitle>
        {/* {data ? data[0].date : "hello"} */}
        <ButtonGroup className='mt-md-0 mt-1'>
          <Button active={active === 'Daily'} color='primary' outline onClick={() => setActive('Daily')}>
            Daily
          </Button>
          <Button active={active === 'Weekly'} color='primary' outline onClick={() => setActive('Weekly')}>
            Weekly
          </Button>
          <Button active={active === 'Monthly'} color='primary' outline onClick={() => setActive('Monthly')}>
            Monthly
          </Button>
          <Button active={active === 'Yearly'} color='primary' outline onClick={() => setActive('Yearly')}>
            Yearly
          </Button>
        </ButtonGroup>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='line' height={400} />
      </CardBody>
    </Card>
  )
}

export default ApexLineChart

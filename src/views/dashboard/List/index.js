import React, { useContext, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import CompanyTable from './CompanyTable'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '../customListCharts/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'
import ApexDonutChart from '../customListCharts/ApexDonutChart'
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import TableZeroConfig from '../customListCharts/TableZeroConfig'
import ApexAreaChart from '../customListCharts/ApexAreaCharts'
// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'
import axios from 'axios'
import headers from "./headers.json"

const config = {
  method: 'get',
  url: 'http://localhost:3033/domain_volumes',
  headers
}
class ListDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: null,
      queryData: null,
      allqueryData: null
    }
  }
  async fetchGrowths(type) {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    let query = await fetch(`http://localhost:3033/path?name=${type}`, requestOptions)

    query = await query.json()
    console.log(query)
    console.log("type")
    this.setState({ queryData: query.payload })
    return query.payload
  }

  async componentDidMount() {
    const growths = await this.fetchGrowths("sum_active_inactive")
    console.log(growths)
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    const response = await fetch("http://localhost:3033/domain_volumes", requestOptions)
    const newData = await response.json()
    this.setState({ listData: newData.payload })

    console.log(newData)
    console.log(this.state.listData)

    const types = ["sum_active_inactive", "sum(`unsubscribes`)", "sum(`active`)", "sum(`bounces`)", "sum(`complaints`)"]
    const allQueryData = types.map(async (type) => { const data = await this.fetchGrowths(type); return data.data })
    console.log(allQueryData)
    // const a = await allQueryData[0]
    // console.log(a)
    this.setState({ allQueryData })

  }

  render() {

    return (
      <div id='dashboard-list'>
        <Row className='match-height'>
          <Col xl='12' md='12' xs='12'>
            <StatsCard newdata={this.state.listData} cols={{ xl: '2', lg: '3', sm: '6' }} />
          </Col>
        </Row>

        <Row className='match-height'>
          <Col lg='12'>
            <ApexAreaChart allData={this.state.allQueryData} data={this.state.queryData} />
          </Col>
          <Col lg='6' xs='12'>
            <TableZeroConfig newdata={this.state.listData} />
          </Col>

          <Col lg='6' md='6' xs='12'>
            <ApexDonutChart data={this.state.listData} />
          </Col>
        </Row>

      </div>
    )
  }
}


export default ListDashboard

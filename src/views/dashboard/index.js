import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, Progress, Card } from 'reactstrap'
import StatsCard from './customListCharts/StatsCard'
import ApexDonutCostChart from './customListCharts/ApexDonutCostChart'
import ApexDonutSavingChart from './customListCharts/ApexDonutSavingChart'
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import ProgressBar from './customListCharts/ProgressBar'
import ApexScatterChart from './customListCharts/ApexScatterCharts'
import ApexLineChart from "./customListCharts/ApexLineChart"


class ListDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: null,
      queryData: null,
      allqueryData: null
    }
  }

  async componentDidMount() {

  }

  render() {

    return (
      <div id='dashboard-list' className="pt-5 ">
        <Row className='match-height' >
          <Col lg='7' md='7' xs='12'>
            <ApexScatterChart
              direction='ltr'
              primary="#6f61ee"
              success="#61ed7f"
              warning="#ff9d00"

            />
            <ApexLineChart primary="#6f61ee" direction='ltr' warning="#ff9d00" />

          </Col>
          <Col lg='5' md='5' xs='12' id="progress-bar" className="pr-5">

            <h4>Remaining Emission Limit in the Cycle</h4>
            <ProgressBar height={30} />

            <div style={{ textAlign: 'right', paddingRight: 20 }}>
              <small className='text-muted' >90 days remaining</small></div>

            <ApexDonutCostChart className="mt-5" />

            <ApexDonutSavingChart />

          </Col>
        </Row>

        <Row className='match-height'>

          <Col lg='6' md='6' xs='12'>
            {/* <ApexDonutChart data={this.state.listData} /> */}
          </Col>
        </Row>

      </div>
    )
  }
}


export default ListDashboard

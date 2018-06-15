import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';

import styles from './Analysis.less';
import CardLoader from "../../components/CardLoader/CardLoader";

@connect(({ chart, loading, cardpositions }) => ({
  chart,
  cardpositions,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  state = {
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  render() {

    const positions = this.props.cardpositions.cardpositions, data = [];

    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 48 },
    };

    return (

      <Fragment>

        <Row>


          <Col span={18}>

            <Row gutter={24}>

              {/*first row of small cards*/}
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[0]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[1]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[2]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[3]} data={data}/>
              </Col>
            </Row>

            {/*second row of small cards*/}
            <Row gutter={24}>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[6]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[7]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[8]} data={data}/>
              </Col>
              <Col {...topColResponsiveProps}>
                <CardLoader component={positions[9]} data={data}/>
              </Col>
            </Row>

            {/*wider cards*/}
            <CardLoader component={positions[10]} data={data}/>

            <CardLoader component={positions[11]} data={data}/>

          </Col>

          <Col span={5} push={1}>
            {/*right hand side bar */}
            <CardLoader component={positions[12]} data={data}/>
          </Col>


        </Row>

      </Fragment>
    );
  }
}

import React, {Component} from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import numeral from "numeral";

import schema from './schema.json';

import { Row, Col } from 'antd';

import {
  ChartCard,
  Field
} from 'components/Charts';

import NumberInfo from 'components/NumberInfo';

class NarrativeSummaryCard extends Component {
  constructor(props) {
    super(props);
    this.schema = schema;
    this.state = {};
  }

  render() {
    const { data } = this.props;

    return (<ChartCard
      bordered={false}
      title={data.title}
    >
      <Row>

        <Col span={8}>
          <NumberInfo subTitle={data.values[0].title} total={data.values[0].value} />
        </Col>

        <Col span={8}>
          <NumberInfo subTitle={data.values[1].title} total={data.values[1].value} />
        </Col>

        <Col span={8}>
          <NumberInfo subTitle={data.values[2].title} total={data.values[2].value} />
        </Col>

      </Row>

    </ChartCard>);
  }
}

NarrativeSummaryCard.defaultProps = {
  data: {}
};

export default NarrativeSummaryCard;

import React, {Component} from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import numeral from "numeral";

import { Row, Col } from 'antd';

import {
  ChartCard,
  Field
} from 'components/Charts';

import NumberInfo from 'components/NumberInfo';

class NarrativeSummaryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

    return (<ChartCard
      bordered={false}
      title="Narrative Summary"
    >
      <Row>
        <Col span={8}>
          <NumberInfo subTitle="Something" total="92%" />
        </Col>

        <Col span={8}>
          <NumberInfo subTitle="Else" total="92%" />
        </Col>

        <Col span={8}>
          <NumberInfo subTitle="Entirely" total="92%" />
        </Col>

      </Row>

    </ChartCard>);
  }
}

NarrativeSummaryCard.defaultProps = {
  data: {}
};

export default NarrativeSummaryCard;

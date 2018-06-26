import PropTypes from 'prop-types';

import {Card, Tooltip, Icon } from 'antd';

import React, {Component} from 'react';

import {
  ChartCard,
  Field,
  MiniArea
} from 'components/Charts';
import BigTrend from "../BigTrend";

class NarrativeTrend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, type, percent, absolute, delta, direction, tooltip, trend } = this.props;

    return (

      <ChartCard
        bordered={false}
        title={type}
        action={
          <Tooltip title={tooltip}>
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={ <BigTrend reverseColor percent={percent} flag={direction}  />}
        footer={[<Field label={delta} />, <Field label={type} value={absolute} />]}
        contentHeight={56}
      >
        <MiniArea line height={40} data={trend}/>

      </ChartCard>


    );
  }
}

NarrativeTrend.propTypes = {
  type : PropTypes.string,
  percent : PropTypes.number,
  absolute: PropTypes.number,
  delta : PropTypes.string,
  direction : PropTypes.string,
  tooltip : PropTypes.string,
  trend : PropTypes.array
};

NarrativeTrend.defaultProps = {
  tooltip : 'put tooltip here',
  type : 'put type here',
  percent : 0,
  absolute: 0,
  delta : '+0 above baseline',
  direction : 'up',
  trend : []

};

export default NarrativeTrend;



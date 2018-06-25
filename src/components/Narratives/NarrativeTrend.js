import PropTypes from 'prop-types';

import React, {Component} from 'react';

import {
  ChartCard,
  Field,
} from 'components/Charts';
import BigTrend from "../BigTrend";

class NarrativeTrend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, percent, absolute, delta, direction } = this.props;

    console.log(direction);

    return (<ChartCard
      bordered={false}
      title={type}
      total={<span>{`${percent}%`} <BigTrend flag={direction}/> </span>}
      footer={[<Field label={`${absolute} ${type}`} />, <Field label={delta}  />]}
      contentHeight={46}
    >

    </ChartCard>);
  }
}

NarrativeTrend.propTypes = {
  type : PropTypes.string,
  percent : PropTypes.number,
  absolute: PropTypes.number,
  delta : PropTypes.string,
  direction : PropTypes.string
};

NarrativeTrend.defaultProps = {
  type : 'Posts',
  percent : 0,
  absolute: 0,
  delta : '+0 above baseline',
  direction : 'up'
};

export default NarrativeTrend;



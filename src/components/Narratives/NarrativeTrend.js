import PropTypes from 'prop-types';

import React, {Component} from 'react';

import {
  ChartCard,
  Field,
} from 'components/Charts';

class NarrativeTrend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, percent, absolute, delta } = this.props;

    return (<ChartCard
      bordered={false}
      title={type}
      total={`${percent}%`}
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
  delta : PropTypes.string
};

NarrativeTrend.defaultProps = {
  type : 'Posts',
  percent : 0,
  absolute: 0,
  delta : '+0 above baseline'
};

export default NarrativeTrend;



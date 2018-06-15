import React, {Component} from 'react';

import numeral from 'numeral';

import Trend from 'components/Trend';

import {
  ChartCard,
  Field,
} from '../../Charts/index';

import styles from './DirectionCard.less';

class DirectionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

    return (<ChartCard
      bordered={true}
      title={data.title}
      footer={<Field label="Blah" value={`${numeral(12423).format('0,0')}`} />}
      contentHeight={150}
    >
      <span style={{zoom : 3}}>

        {data.direction === 'up' ? <Trend flag="up" style={{ marginRight: 16}}>
          UP<span className={styles.trendText} >{data.value}%</span>
        </Trend> : <Trend flag="down">
          DOWN<span className={styles.trendText} >{data.value}%</span>
        </Trend>}

      </span>
    </ChartCard>);
  }
}

DirectionCard.defaultProps = {
  data: {}
};

export default DirectionCard;

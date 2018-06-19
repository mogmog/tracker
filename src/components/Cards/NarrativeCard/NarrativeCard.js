import React, {Component} from 'react';

import numeral from 'numeral';

import schema from './schema.json';

import Trend from 'components/Trend';

import {
  ChartCard,
  Field,
} from '../../Charts/index';

import styles from './NarrativeCard.less';

class NarrativeCard extends Component {
  constructor(props) {
    super(props);
    this.schema = schema;
    this.state = {};
  }

  render() {

    const {data} = this.props;

    return (<ChartCard
      bordered={false}
      title={data.title}
      footer={<Field label={data.subtitle}  />}
      contentHeight={100}
    >

      <Trend flag="up" style={{ marginRight: 16 }}>
        UP<span className={styles.trendText} >12%</span>
      </Trend>

      <Trend flag="down">
        DOWN<span className={styles.trendText}>11%</span>
      </Trend>

    </ChartCard>);
  }
}

export default NarrativeCard;

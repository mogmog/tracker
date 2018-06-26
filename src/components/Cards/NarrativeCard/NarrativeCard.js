import React, {Component} from 'react';

import sample from './sample.json';
import schema from './schema.json';

import Trend from 'components/Trend';
import NarrativeCardModal from './NarrativeCardModal';

import { Modal, Icon } from 'antd';


import {
  ChartCard,
  Field,
} from '../../Charts/index';

import styles from './NarrativeCard.less';

class NarrativeCard extends Component {
  constructor(props) {
    super(props);
    this.schema = schema;
    this.state = {modalvisible : false};
  }

  toggleModal() {
    this.setState({ 'modalvisible' : !this.state.modalvisible});
  }

  render() {

    const { data } = this.props;
    const { modalvisible } = this.state;

    //
    return (<div><ChartCard
      bordered={true}
      style={{ border: data.color  }}
      title={<span> <Icon type={'message'}/> {data.title}</span>}
      footer={<Field label={data.subtitle}  />}
      contentHeight={250}
      onClick={this.toggleModal.bind(this)}
    >

      {data.direction === 'up' && (<Trend flag="up" style={{ marginRight: 16 }}> UP<span className={styles.trendText} >12%</span> </Trend>) }

      {data.direction === 'down' && (<Trend flag="down"> DOWN<span className={styles.trendText}>11%</span> </Trend>) }


    </ChartCard>

      {modalvisible && <NarrativeCardModal data={data} toggle={this.toggleModal.bind(this)}/> }

    </div>);
  }
}

NarrativeCard.defaultProps = {
  data: sample
};

export default NarrativeCard;

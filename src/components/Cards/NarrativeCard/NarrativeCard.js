import React, {Component} from 'react';

import sample from './sample.json';
import schema from './schema.json';

import Trend from 'components/Trend';
import NarrativeCardModal from './NarrativeCardModal';

import { Modal, Icon , List} from 'antd';


import {
  ChartCard,
  Field,
} from '../../Charts/index';

import styles from './NarrativeCard.less';
import BigTrend from "../../BigTrend";

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
      footer={<Field style={{'height' : '130px' }} label={data.subtitle}  />}
      contentHeight={80}
      onClick={this.toggleModal.bind(this)}
    >

      {data.direction === 'up' && (<BigTrend reverseColor percent={data.percent} flag={data.direction}  />) }

      {data.direction === 'down' && (<BigTrend reverseColor percent={data.percent} flag={data.direction}  />) }


    </ChartCard>

      {modalvisible && <NarrativeCardModal data={data} toggle={this.toggleModal.bind(this)}/> }

    </div>);
  }
}

NarrativeCard.defaultProps = {
  data: sample
};

export default NarrativeCard;

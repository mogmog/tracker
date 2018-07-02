import React, {Component} from 'react';

import sample from './sample.json';
import schema from './schema.json';

import Trend from 'components/Trend';
import NarrativeCardModal from './NarrativeCardModal';

import { Modal, Icon , List} from 'antd';


import {
  ChartCard,
  Field,
  ChartCardHeader
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
      title={<ChartCardHeader tooltip={data.subtitle} colorIndex={data.colorIndex} text={data.title}/>}
      contentHeight={60}
      onClick={this.toggleModal.bind(this)}
    >

      {data.direction === 'up' && (<BigTrend  percent={data.percent} flag={data.direction}  />) }

      {data.direction === 'down' && (<BigTrend  percent={data.percent} flag={data.direction}  />) }


    </ChartCard>

      {modalvisible && <NarrativeCardModal data={data} toggle={this.toggleModal.bind(this)}/> }

    </div>);
  }
}

NarrativeCard.defaultProps = {
  data: sample
};

export default NarrativeCard;

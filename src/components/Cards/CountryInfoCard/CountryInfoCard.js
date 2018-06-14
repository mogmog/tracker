import React, {Component} from 'react';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
} from '../../Charts/index';

import { Modal, Icon , Card} from 'antd';

import CountryInfoModalCard from './CountryInfoModalCard';
import GeoJSONThumbnail from '../../Maps/GeoJSONThumbnail';

class CountryInfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = { modal : false };
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({modal: !this.state.modal});
  }

  render() {

    const { modal } = this.state;

    return (<ChartCard
      bordered={false}
      action={<Icon type="arrows-alt" style={{'font-size' : '12px'}} onClick={this.handleCancel.bind(this)} />}
      title="Estonia"
      footer={<Field label="Population" value={numeral(1234).format('0,0')}/>}
      contentHeight={150}
    >

      <GeoJSONThumbnail/>

      <Modal
        visible={modal}
        width={1000}
        bodyStyle={{'height' : '60vh' }}
        title={``}
        onCancel={this.handleCancel.bind(this)}
        footer={[]}
      >

        <CountryInfoModalCard />

      </Modal>


    </ChartCard>);
  }
}

export default CountryInfoCard;

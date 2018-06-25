import React, {Component} from 'react';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
} from '../../Charts/index';

import { Modal, Icon , Card} from 'antd';

import CountryInfoModalCard from './CountryInfoModalCard';
import GeoJSONThumbnail from '../../Maps/GeoJSONThumbnail';

import sample from './sample';
import schema from './schema';

class CountryInfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = { modal : false };
    this.sample = sample;
    this.schema = schema;
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({modal: !this.state.modal});
  }

  render() {

    const {data} = this.props;

    const { modal } = this.state;

    return (<ChartCard
      bordered={false}
      action={<Icon type="arrows-alt" style={{'fontSize' : '12px'}} onClick={this.handleCancel.bind(this)} />}
      title={<span><Icon type="global" /> {data.title}</span>}
      footer={data.fields.map((field) => <Field label={field.title} value={field.value}/> )}
      contentHeight={150}
    >

      <GeoJSONThumbnail geojson={data.map}/>

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

CountryInfoCard.defaultProps = {
  data: sample,
}


export default CountryInfoCard;

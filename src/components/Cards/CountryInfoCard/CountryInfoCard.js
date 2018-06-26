import React, {Component} from 'react';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
} from '../../Charts/index';

import WorldMap from './../../Maps/WorldMap';

import { Row, Col, Modal, Icon , Card, List} from 'antd';

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
      contentHeight={198}
    >

      <GeoJSONThumbnail geojson={data.map}/>

      <Modal
        visible={modal}
        width={'70%'}
        title={data.title}
        onCancel={this.handleCancel.bind(this)}
        footer={[]}
      >

        <Row>

          <Col span={12}>
            <WorldMap geo={data.map} zoomTo={this.state.zoomto}/>
          </Col>

          <Col span={12}>

            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
              dataSource={data.modal}
              renderItem={item => (
                <List.Item>
                  <Card title={item.title}>Card content</Card>
                </List.Item>
              )}
            />

          </Col>

        </Row>



      </Modal>


    </ChartCard>);
  }
}

CountryInfoCard.defaultProps = {
  data: sample,
}


export default CountryInfoCard;

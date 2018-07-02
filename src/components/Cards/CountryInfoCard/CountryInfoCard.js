import React, {Component} from 'react';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
  ChartCardHeader
} from '../../Charts/index';

import WorldMap from './../../Maps/WorldMap';

import {Row, Col, Modal, Icon, Card, List} from 'antd';


import CountryInfoModalCard from './CountryInfoModalCard';
import GeoJSONThumbnail from '../../Maps/GeoJSONThumbnail';


import sample from './sample';
import schema from './schema';



class CountryInfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {modal: false};
    this.sample = sample;
    this.schema = schema;
  }

  toggleModal(e) {
    e.preventDefault();
    this.setState({modal: !this.state.modal});
  }

  render() {

    const {data} = this.props;

    const {modal} = this.state;


    return (<ChartCard
      bordered={false}
      title={<ChartCardHeader text={data.title}/>}
      footer={data.fields.map((field) => <Field label={field.title} value={field.value}/>)}
      contentHeight={150}
    >

      <div onClick={this.toggleModal.bind(this)}>
        <GeoJSONThumbnail geojson={data.map}/>
      </div>

      <Modal
        visible={modal}
        width={'70%'}
        title={data.title}
        onCancel={this.toggleModal.bind(this)}
        footer={[]}
      >

        <Row>

          <Col span={12}>
            <WorldMap geo={data.map} zoomTo={this.state.zoomto}/>
          </Col>

          {data.countryinfo && data.countryinfo.col1 && <Col span={6}>
            <Card title={data.countryinfo.col1.title}>
              <List
                grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3}}
                dataSource={data.countryinfo.col1.items}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />
            </Card>

          </Col>
          }


          {data.countryinfo && data.countryinfo.col2 && <Col span={6}>
            <Card title={data.countryinfo.col2.title}>
              <List
                grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3}}
                dataSource={data.countryinfo.col2.items}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />
            </Card>

          </Col>
          }

        </Row>


      </Modal>


    </ChartCard>);
  }
}

CountryInfoCard.defaultProps = {
  data: sample,
}


export default CountryInfoCard;

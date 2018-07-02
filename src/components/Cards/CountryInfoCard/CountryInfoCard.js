import React, {Component} from 'react';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
  Pie,
  ChartCardHeader
} from '../../Charts/index';

import WorldMap from './../../Maps/WorldMap';

import {Table, Row, Col, Modal, Icon, Card, List, Divider} from 'antd';

import styles from './styles.less';

import CountryInfoModalCard from './CountryInfoModalCard';
import GeoJSONThumbnail from '../../Maps/GeoJSONThumbnail';


import sample from './sample';
import schema from './schema';
import Demographic from "../../Charts/Demographic";



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

    const columns = [{
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank'
    }, {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    }];

    const socialmediadata = [
      {
        key: '1',
        rank: '1',
        website: 'facebook.com',
      },

      {
        key: '2',
        rank: '2',
        website: 'youtube.com',
      },

      {
        key: '3',
        rank: '3',
        website: 'vk.com',
      },

      {
        key: '4',
        rank: '4',
        website: 'ok.ru',
      },

      {
        key: '5',
        rank: '5',
        website: 'twitter.com',
      }

    ];

    const sitedata = [{
      key: '1',
      rank: '1',
      website: 'google.com',
    },

      {
        key: '2',
        rank: '2',
        website: 'google.ee',
      },

      {
        key: '3',
        rank: '3',
        website: 'facebook.com',
      },

      {
        key: '4',
        rank: '4',
        website: 'youtube.com',
      },

      {
        key: '5',
        rank: '5',
        website: 'posttimes.ee',
      },

      {
        key: '6',
        rank: '6',
        website: 'delfi.ee',
      },

      {
        key: '7',
        rank: '7',
        website: 'vk.com',
      },

      {
        key: '8',
        rank: '8',
        website: 'mail.ru',
      },

      {
        key: '9',
        rank: '9',
        website: 'ok.ru',
      },

      {
        key: '10',
        rank: '10',
        website: 'swedbank.ee',
      }





    ];


    const salesPieData = [
      {
        x: 'Russian Speaking',
        y: 370468,
      },
      {
        x: 'Not Russian Speaking',
        y: 881113,
      }
    ];

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
        title={<ChartCardHeader text={data.title}/>}
        onCancel={this.toggleModal.bind(this)}
        footer={[]}
      >

        <Row>

          <Col span={16}>
            <WorldMap markers={data.markers} geo={data.map} zoomTo={this.state.zoomto}/>

            <Divider></Divider>

            <Row>
              <Col span={12}>
                <Demographic/>
              </Col>

              <Col span={12}>
                <Pie
                  title="29.3% Russian speaking"
                  subTitle={<span><h2>29.3%</h2><h5> Russian speaking </h5></span>}
                  data={salesPieData}
                  height={270}
                />
              </Col>
            </Row>


          </Col>

          {data.countryinfo && data.countryinfo.col1 && <Col span={7} push={1}>

              <h3>Top websites by traffic</h3>
              <Table className={styles.websitetable} bordered={false} pagination={false} size='small' columns={columns} dataSource={sitedata} />

            <Divider/>

            <h3>Top social media sites by traffic</h3>
            <Table className={styles.websitetable} bordered={false} pagination={false} size='small' columns={columns} dataSource={socialmediadata} />

              {/*<List
                grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3}}
                dataSource={data.countryinfo.col1.items}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />*/}

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

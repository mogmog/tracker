import React, {Component} from 'react';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
} from '../../Charts/index';

import { Row, Col, Modal, Icon , Card, List} from 'antd';

import sample from './sample';
import schema from './schema';

class HDSuggestionCard extends Component {
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

    return (

      <ChartCard
        bordered={false}
        contentHeight={150}
        title={<span><Icon type={'check'} />{data.title}</span>}
      >

        <Row>
          <Col span={24}>
            <List
              size="small"
              bordered
              dataSource={data.list}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
          </Col>

        </Row>

      </ChartCard>
     );
  }
}

HDSuggestionCard.defaultProps = {
  data: sample,
}


export default HDSuggestionCard;

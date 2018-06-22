import React, {Component} from 'react';
import { Tabs, List, Avatar, Button, Row, Col , Icon, Modal, Menu, Dropdown, Timeline, Divider  } from 'antd';

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {

    const {item, onClick } = this.props;

    return (
      <List.Item onClick={onClick}>
      <List.Item.Meta title={<Row> <Col span={4}><Icon type={'facebook'}/> </Col><Col span={20}>blah blah blah</Col> </Row> }
      />
    </List.Item>)
  }
}

export default PostItem;

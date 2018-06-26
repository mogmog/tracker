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
      <List.Item.Meta title={<Row> <Col span={4}>

        {item.type === 'facebook' && <Icon type={'facebook'}/>}
        {item.type === 'twitter' && <Icon type={'twitter'}/>}

      </Col><Col span={20}> {item.content}</Col> </Row> }
      />
    </List.Item>)
  }
}

export default PostItem;

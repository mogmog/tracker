import React, {Component} from 'react';
import { Tabs, List, Avatar, Button, Row, Col , Icon, Modal, Menu, Dropdown, Timeline, Divider  } from 'antd';

import PlatformGrid from "../PlatformGrid/PlatformGrid";

class InfluencerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {

    const {item, onClick, extra } = this.props;

    return (
      <List.Item onClick={onClick}>
      <List.Item.Meta
        title={<Row> <Col span={12}>{extra} {item.name} </Col>
          <Col span={12} push={4}>
            <PlatformGrid twitter={item.twitter} facebook={item.facebook} instagram={item.instagram}/>
          </Col>
        </Row> }
      />
    </List.Item>)
  }
}

export default InfluencerItem;

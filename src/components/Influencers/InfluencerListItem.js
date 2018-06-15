import React, {Component} from 'react';
import { List, Avatar, Button, Row, Col , Icon} from 'antd';

class InfluencerListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;

    return (

      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<Row> <Col span={14}>{item.title}</Col> <Col span={10}><Button  shape="circle"> <Icon type="eye" /> </Button> <Button  shape="circle"> <Icon type="twitter" /> </Button> </Col> </Row> }
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>);
  }
}

export default InfluencerListItem;



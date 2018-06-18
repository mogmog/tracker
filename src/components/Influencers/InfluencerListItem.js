import React, {Component} from 'react';
import { List, Avatar, Button, Row, Col , Icon, Modal } from 'antd';

class InfluencerListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {visible : false};
  }

  toggleModal() {
  this.setState({ 'visible' : !this.state.visible});
  }

  render() {
    const { item } = this.props;
    const { visible } = this.state;

    return (

      <div><List.Item>
        <List.Item.Meta
          onClick={this.toggleModal.bind(this)}
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<Row> <Col span={14}>{item.title}</Col> <Col span={10}><Button  shape="circle"> <Icon type="eye" /> </Button> <Button  shape="circle"> <Icon type="twitter" /> </Button> </Col> </Row> }
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        <Modal visible={visible} width={'80%'} onCancel={this.toggleModal.bind(this)}>
          I display something
        </Modal>
      </List.Item></div>);
  }
}

export default InfluencerListItem;



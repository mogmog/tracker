import React, {Component} from 'react';
import { Tabs, List, Avatar, Button, Row, Col , Icon, Modal, Menu, Dropdown, Timeline, Divider  } from 'antd';
import styles from './PostItem.less';

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {

    const {item, onClick } = this.props;

    return (
      <div className={styles.postitem}>
      <List.Item onClick={onClick}>
      <List.Item.Meta title={<Row> <Col span={4}>

        {item.type === 'facebook' && <Icon type={'facebook'}/>}
        {item.type === 'twitter' && <Icon type={'twitter'}/>}

      </Col><Col span={20} > <span className={styles.content}>{item.content_en} </span></Col> </Row> }
      />
      </List.Item></div>)
  }
}

export default PostItem;

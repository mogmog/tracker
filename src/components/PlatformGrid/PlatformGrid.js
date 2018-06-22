import React, {Component} from 'react';
import {  Row, Col, Icon } from 'antd';
import styles from './PlatformGrid.less';

class PlatformGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Row gutter={0}>
        <Col span={6}>
          <Icon className={this.props.twitter ? styles.active : styles.notactive} type="twitter" />
        </Col>

        <Col span={6}>
          <Icon className={this.props.facebook ? styles.active : styles.notactive} type="facebook" />
        </Col>

        <Col span={6}>
          <Icon className={this.props.instagram ? styles.active : styles.notactive} type="instagram" />
        </Col>

      </Row>

    );
  }
}

PlatformGrid.defaultProps = {
  twitter: false,
  instagram: false,
  facebook: false,
};

export default PlatformGrid;








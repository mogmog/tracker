import React, {Component} from 'react';
import {Card, Tabs, List, Avatar, Button, Row, Col, Icon, Modal, Menu, Dropdown, Timeline, Divider} from 'antd';

import PlatformGrid from "../PlatformGrid/PlatformGrid";
import styles from './InfluencerDetail.less';
import DescriptionList from "../DescriptionList/DescriptionList";
import Description from "../DescriptionList/Description";

class InfluencerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {item} = this.props;

    const detail = (


      <Row>
        <Col span={12}>

          <div className={styles.detail}>
            <div className={styles.content}>
              <div className={styles.contentTitle}>

                <Avatar
                  size="large"
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                />

                {item.name}</div>
            </div>
          </div>

        </Col>

        <Col span={6} push={6} >
          <PlatformGrid twitter={item.twitter} facebook={item.facebook} instagram={item.instagram}/>
        </Col>

      </Row>


    );

    return (<Card>
      <Row>
        <Col span={24}>
          {detail}

          <DescriptionList size="large" style={{marginBottom: 32}}>
            <Description term="Language"> English</Description>
            <Description term="City/Country">Tallin</Description>
            <Description term="Category">Hate speech</Description>
            <Description term="Notes">Here are some notes</Description>
          </DescriptionList>

        </Col>
        {/* <Col span={6}>
          <PlatformGrid twitter={item.twitter} facebook={item.facebook} instagram={item.instagram}/>
        </Col>*/}
      </Row>

    </Card>)
  }
}

export default InfluencerDetail;

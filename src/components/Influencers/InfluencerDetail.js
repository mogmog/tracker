import React, {Component} from 'react';
import {Card, Tabs, List, Avatar, Button, Row, Col, Icon, Modal, Menu, Dropdown, Timeline, Divider} from 'antd';

import PlatformGrid from "../PlatformGrid/PlatformGrid";
import styles from './InfluencerDetail.less';
import DescriptionList from "../DescriptionList/DescriptionList";
import Description from "../DescriptionList/Description";
import ContentList from "../Content/List/ContentList";

class InfluencerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {item} = this.props;

    const detail = (
<div>

      <Row>
        <Col span={12}>

          <div className={styles.detail}>
            <div className={styles.content}>
              <div className={styles.contentTitle}>

                <Avatar
                  size="large"
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                />

                {item.name}

                <span style={{display: 'inline-block', width : '100px', transform: 'translate(8px, 8px)'}}>
                <PlatformGrid twitter={item.twitter} facebook={item.facebook} instagram={item.instagram}/>
                </span>
                </div>
            </div>
          </div>

        </Col>

      </Row>

      <Row>
        <Col span={4}>

        </Col>
        </Row>
</div>


    );

    return (<Card>
      <Row>
        <Col span={24}>
          {detail}

          <DescriptionList size="large" style={{marginBottom: 32}}>
            <Description term="Language"> {item.language}</Description>
            <Description term="City/Country">{item.country}</Description>
            <Description term="Category">{item.category}</Description>
          </DescriptionList>

          <DescriptionList size="large" style={{marginBottom: 32}}>
            <Description term="Notes" style={{display  : 'block', 'width' : '200%'}}>{item.notes}</Description>
          </DescriptionList>
        </Col>
        {/* <Col span={6}>
          <PlatformGrid twitter={item.twitter} facebook={item.facebook} instagram={item.instagram}/>
        </Col>*/}
      </Row>

      <Row>
        <Col span={22} >
          {item.posts && <ContentList posts={item.posts}/>}
        </Col>
      </Row>

    </Card>)
  }
}

InfluencerDetail.defaultProps = {

}

export default InfluencerDetail;

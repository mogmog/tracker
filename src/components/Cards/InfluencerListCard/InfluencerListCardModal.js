import React, {Component} from 'react';
import { Tabs, List, Avatar, Button, Row, Col , Icon, Modal, Menu, Dropdown, Timeline, Divider  } from 'antd';
import FacebookProvider, { EmbeddedPost } from 'react-facebook';

import { MiniArea } from 'components/Charts';
import moment from "moment/moment";
import BigTrend from "../../BigTrend/index";

import InfluencerItem from "./../../Influencers/InfluencerItem";
import CustomMentionEditor from '../EditorCard/EditorWithMentions';
import InfluencerDetail from "../../Influencers/InfluencerDetail";

const TabPane = Tabs.TabPane;

class InfluencerListCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {visible : false};
  }


  render() {
    const { item, visible, onCancel } = this.props;

    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 8};

    return (
      <Modal title={'Influencer Detail'} visible={visible} width={'70%'} onCancel={onCancel} footer={[]}>

          <Row>
            <Col span={24}>
              <InfluencerDetail item={item}></InfluencerDetail>
            </Col>

          </Row>
        </Modal>);
  }
}

export default InfluencerListCardModal;



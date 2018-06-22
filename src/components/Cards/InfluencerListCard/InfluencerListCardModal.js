import React, {Component} from 'react';
import { Tabs, List, Avatar, Button, Row, Col , Icon, Modal, Menu, Dropdown, Timeline, Divider  } from 'antd';
import FacebookProvider, { EmbeddedPost } from 'react-facebook';

import { MiniArea } from 'components/Charts';
import moment from "moment/moment";
import BigTrend from "../../BigTrend/index";

import InfluencerItem from "./../../Influencers/InfluencerItem";
import CustomMentionEditor from '../EditorCard/EditorWithMentions';

const TabPane = Tabs.TabPane;

class InfluencerListCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {visible : false};
  }


  render() {
    const { item, visible, onCancel } = this.props;

    const data = [{"x":"2018-06-21","y":1},{"x":"2018-06-22","y":6},{"x":"2018-06-23","y":4},{"x":"2018-06-24","y":8},{"x":"2018-06-25","y":3},{"x":"2018-06-26","y":7},{"x":"2018-06-27","y":2}];

    const thing = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];



    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 8};

    return (
      <Modal title={<Row><Col span={6}><InfluencerItem item={item} /></Col></Row>} visible={visible} width={'70%'} onCancel={onCancel} footer={[]}>

          <Row>
            <Col span={16}>
              <Tabs defaultActiveKey="1" >
                <TabPane tab="Stats" key="1">

                  <Row>

                    <Col span={10}>
                      <MiniArea line height={120} data={data} />
                      <BigTrend reverseColor flag={'up'} children={<span>56%</span>}/>
                    </Col>

                    <Col span={4}>
                    </Col>

                    <Col span={10}>
                      <MiniArea line height={120} data={data} />
                      <BigTrend reverseColor flag={'down'} children={<span>35%</span>}/>
                      {/*graph*/}
                      {/*trend*/}
                    </Col>

                  </Row>

                  <Divider/>

                  <Row gutter={10}>

                    <Col {...topColResponsiveProps}>
                      <FacebookProvider appId="1568172383396211" >
                        <EmbeddedPost href="https://www.facebook.com/20531316728/posts/10154009990506729/" width={'100px'} />
                      </FacebookProvider>
                    </Col>

                    <Col {...topColResponsiveProps}>
                      <FacebookProvider appId="1568172383396211">
                        <EmbeddedPost href="https://www.facebook.com/20531316728/posts/10154009990506729/"  width={'100px'} />
                      </FacebookProvider>
                    </Col>

                    <Col {...topColResponsiveProps}>
                      <FacebookProvider appId="1568172383396211">
                        <EmbeddedPost href="https://www.facebook.com/20531316728/posts/10154009990506729/" width={'100px'} />
                      </FacebookProvider>
                    </Col>

                  </Row>


                </TabPane>
                <TabPane tab="Timeline" key="2">
                  <Row>
                    <Col span={24}>

                      <Timeline>
                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                      </Timeline>

                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Col>

            <Col span={8} push={1}>
              <CustomMentionEditor actions={()=>{}}></CustomMentionEditor>
            </Col>
          </Row>
        </Modal>);
  }
}

export default InfluencerListCardModal;


